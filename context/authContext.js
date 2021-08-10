import React, { useState, useEffect, usecontext } from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'

const AuthContext = React.createContext({
  user: null,
  error: '',
  loading: true,
  login: async (email, password) => { },
  logout: async () => { },
})

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
      console.log('auth state changed', user)
    })
  }, [])

  const login = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
      const user = userCredential.user
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  const logout = async () => {
    await firebase.auth.signOut()
  }

  return <AuthContext.Provider
    value={{
      user,
      error,
      loading,
      login,
      logout
    }}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext