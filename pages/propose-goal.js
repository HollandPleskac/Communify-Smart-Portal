import React from 'react'
import Navigation from '../components/nav'
import AuthContext from '../context/authContext'
import { useRouter } from 'next/router'


const Proposegoal = () => {

    const router = useRouter()

    const arrowBackHandler = () => {
        router.push('/')
    }

    const navHandler = () => {
        router.push('/propose-goal')
    }

  return (
    <Navigation>
      <div className = "flex justify-center w-full items-center">
        <div className = "bg-communify-black rounded-3xl" style={{width: 702, height: 683}}>
          
        </div>
      </div>
    </Navigation>
  )
}

export default Proposegoal
