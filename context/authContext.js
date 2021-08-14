import React, { useState, useEffect } from 'react'

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

  const signup = async (email, password) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = userCredential.user
      router.push('/dashboard')
      return 'success'
    } catch (e) {
      console.log('error occurred', e)
      return e.message
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
      logout
    }}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext