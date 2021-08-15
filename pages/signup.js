import React, { useState, useContext } from 'react'
import AuthContext from '../context/authContext'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {
  const authCtx = useContext(AuthContext)
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [cityCode, setCityCode] = useState('')

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value)
  }

  const cityCodeChangeHandler = (e) => {
    setCityCode(e.target.value)
  }

  const fullNameChangeHandler = (e) => {
    setFullName(e.target.value)
  }

  const arrowBackHandler = () => {
    router.push('/')
  }

  const navHandler = () => {
    router.push('/login')
  }

  return (
    <div className='h-screen flex justify-center items-center' >
      <div className='flex flex-col w-96' >
        <p className='text-sm' >&nbsp;</p>
        <h1 className='text-center mb-4 text-3xl font-semibold' >Sign Up</h1>
        <p className='text-center mb-4 text-md' >Already have an account? <span onClick={navHandler} className='text-communify-green font-semibold cursor-pointer' >Login</span></p>
        <Input placeholder='Email' value={email} onChange={emailChangeHandler} />
        <Input placeholder='Full Name' value={fullName} onChange={fullNameChangeHandler} />
        <Input placeholder='Password' value={password} onChange={passwordChangeHandler} />
        <Input placeholder='Confirm Password' value={confirmPassword} onChange={confirmPasswordChangeHandler} />
        <Input placeholder='City Code' value={cityCode} onChange={cityCodeChangeHandler} />
        <Button email={email} password={password} cityCode={cityCode} confirmPassword={confirmPassword} fullName={fullName}/>
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

const Button = ({ email, password, cityCode, confirmPassword, fullName }) => {
  const authCtx = useContext(AuthContext)
  const router = useRouter()

  const btnHandler = async () => {
    await authCtx.signup(email, password, confirmPassword, 'citizen', cityCode, fullName)
    // console.log(email, password)
    // router.push('/dashboard')
  }

  return (
    <button onClick={btnHandler} className='w-96 h-12 rounded text-white bg-communify-green hover:bg-communify-green-alt focus:ring-4 focus:ring-communify-green focus:ring-opacity-50 focus:outline-none transition ease-in duration-100' >Sign Up</button>
  )
}


export default Signup
