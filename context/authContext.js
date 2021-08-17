import React, { useState, useEffect } from 'react'
import axios from 'axios';

import firebase from 'firebase/app'
import 'firebase/auth'
import { useRouter } from 'next/router'

const AuthContext = React.createContext({
  user: null,
  error: '',
  loading: true,
  login: async (email, password) => { },
  signup: async (email, password) => { },
  logout: async () => { },
})

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
      // console.log('auth state changed', user)
    })
  }, [])



  const login = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
      const user = userCredential.user
      setError('')
      router.push('/dashboard')
    } catch (e) {
      setError(e.message)
    }
  }

  const signup = async (email, password, confirmPassword, userType, cityCode, fullName) => {

    if(email && password && confirmPassword && userType && cityCode){
      try {

        if(password == confirmPassword){
          const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
          const user = userCredential.user

          console.log("Created user with firebase auth")
    
          axios.get(`https://communify-api.protosystems.net/v1/createUser?name=${fullName}&uid=${user.uid}&cityCode=${cityCode}&email=${user.email}&userType=${userType}`)
          .then(res => {

            const persons = res.data;
            console.log(res.data)
    
            console.log(res.data['status'])
    
            if(res.data.status == 'success'){
              setError('')
              router.push('/dashboard')
            } else {
              setError("Error: " + res.data.message)
              console.log("Something went wrong")
            }
    
    
          })
        } else {
          setError('Password and repeat password do not match')
        }
  
      } catch (e) {
        console.log('error occurred', e)
      }
    } else {
      setError("Fields cannot be left blank")
    }

  }

  const logout = async () => {
    await firebase.auth().signOut()
  }

  return <AuthContext.Provider
    value={{
      user,
      error,
      loading,
      login,
      signup,
      logout,
    }}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext