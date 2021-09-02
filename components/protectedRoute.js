import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '../context/authContext'

const ProtectRoute = (props) => {
  const router = useRouter()
  const ctx = useContext(AuthContext)

  const isOnProtectedRoute = router.pathname !== '/' && router.pathname !== '/login' && router.pathname !== '/signup'

  if (ctx.loading) {
    return <div></div> // wait to get a user result from AuthContext before making a decision on which page to go to
  }

  if (!ctx.loading && isOnProtectedRoute && ctx.user === null) {
    router.push('/')
    return <div></div> // no user and accessing protected route: pushes to / before returning empty div
  } else {
    return props.children
  }
  // return props.children
}

export default ProtectRoute

// Idea from https://www.mikealche.com/software-development/how-to-implement-authentication-in-next-js-without-third-party-libraries
