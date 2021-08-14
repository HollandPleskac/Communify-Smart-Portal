import React from 'react'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

const Signup = () => {
  const router = useRouter()

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
        <p className='text-center mb-4 text-md' >Already have an account? <span onClick={navHandler} className='text-communify-green font-semibold cursor-pointer' >Sign in!</span></p>
        <Input placeholder='email' />
        <Input placeholder='password' />
        <Input placeholder='confirm password' />
        <Button />
        <p className='mt-3 text-center text-gray-800 text-sm' >&nbsp;</p>
      </div>
      <FontAwesomeIcon icon={faArrowLeft} onClick={arrowBackHandler} className='absolute top-0 left-0 ml-12 mt-12 text-2xl text-gray-800 cursor-pointer' />
    </div>
  )
}

const Input = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className='w-96 h-12 pl-4 mb-4 text-gray-800 border-2 border-gray-400 rounded focus:ring-2 focus:border-green-300 focus:ring-green-300 focus:ring-opacity-50 focus:outline-none transition ease-in duration-100'
    />
  )
}

const Button = (props) => {

  const router = useRouter()

  const btnHandler = () => {
    console.log("Hello sign up clicked")

    axios.get(`https://communify-api.protosystems.net/v1/createUser?`)
    .then(res => {
      const persons = res.data;
      console.log(res.data)
    })

    //router.push('/dashboard')
  }

  return (
    <button onClick={btnHandler} className='w-96 h-12 rounded text-white bg-communify-green hover:bg-communify-green-alt focus:ring-4 focus:ring-communify-green focus:ring-opacity-50 focus:outline-none transition ease-in duration-100'>
      Register
    </button>
  )
}


export default Signup
