import React, { useState, useContext } from 'react'
import AuthContext from '../context/authContext'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const authCtx = useContext(AuthContext)
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  const arrowBackHandler = () => {
    router.push('/')
  }

  const navHandler = () => {
    router.push('/signup')
  }

  return (
    <div className='h-screen flex justify-center items-center' >
      <div className='flex flex-col w-96' >
        <p className='text-sm' >&nbsp;</p>
        <h1 className='text-center mb-4 text-3xl font-semibold' >Sign In</h1>
        <p className='text-center mb-4 text-md' >Don{'\''}t have an account? <span onClick={navHandler} className='text-communify-green font-semibold cursor-pointer' >Sign up!</span></p>
        <Input placeholder='email' value={email} onChange={emailChangeHandler} />
        <Input placeholder='password' value={password} onChange={passwordChangeHandler} />
        <Button email={email} password={password} />
        {
          authCtx.error !== ''
            ? <p className='mt-3 text-center text-gray-800 text-sm' >{authCtx.error}</p>
            : <p className='text-sm' >&nbsp;</p>
        }
      </div>
      <FontAwesomeIcon icon={faArrowLeft} onClick={arrowBackHandler} className='absolute top-0 left-0 ml-12 mt-12 text-2xl text-gray-800 cursor-pointer' />
    </div>
  )
}

const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder={placeholder}
      className='w-96 h-12 pl-4 mb-4 text-gray-800 border-2 border-gray-400 rounded focus:ring-2 focus:border-green-300 focus:ring-green-300 focus:ring-opacity-50 focus:outline-none transition ease-in duration-100'
    />
  )
}

const Button = ({ email, password }) => {
  const authCtx = useContext(AuthContext)
  const router = useRouter()

  const btnHandler = async () => {
    await authCtx.login(email, password)
    // console.log(email, password)
    // router.push('/dashboard')
  }

  return (
    <button onClick={btnHandler} className='w-96 h-12 rounded text-white bg-communify-green hover:bg-communify-green-alt focus:ring-4 focus:ring-communify-green focus:ring-opacity-50 focus:outline-none transition ease-in duration-100' >Login</button>
  )
}


export default Login
