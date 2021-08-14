import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import profImg from '../public/prof.jpg'
import AuthContext from '../context/authContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faClipboard, faBullseye, faCalendar, faArrowAltCircleRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Navigation = (props) => {
  return (
    <div className='h-screen flex flex-col' >
      <TopBar />
      <div className='flex flex-grow' >
        <SideBar />
        <PageContent content={props.children} />
      </div>
    </div>
  )
}

const TopBar = () => {
  return (
    <div className='flex items-center bg-communify-green  ' >
      <div className=' py-6 flex justify-center items-center border-background-gray' style={{ width: 192, borderTop: 'none', borderLeft: 'none', borderWidth: '0.5px' }} >
        <FontAwesomeIcon icon={faCity} className='text-white text-xl' />
        <h1 className='ml-3 text-white font-semibold text-lg' >Communify</h1>
      </div>
      <TopBarLink name='About us' href='#' />
      <TopBarLink name='Help' href='#' />
      <TopBarLink name='Legal' href='#' />
      <Profile />
    </div >
  )
}

const TopBarLink = ({ name, href }) => {
  return (
    <Link href={href}><a className='text-white ml-6'  >{name}</a></Link>
  )
}

const Profile = () => {
  const ctx = useContext(AuthContext)

  const logoutHandler = async () => {
    await ctx.logout()
  }


  return (
    <>
      <div className='ml-auto h-9 w-9 rounded-full bg-gray-400' ></div>
      <p className='ml-3 text-white' >Shabd Veyyakula</p>
      <button onClick={logoutHandler} className='flex items-center justify-center'>
        <FontAwesomeIcon icon={faSignOutAlt} className='ml-4 mr-5 text-gray-300' />
      </button>
    </>
  )
}


const SideBar = () => {
  return (
    <div className='bg-communify-black flex flex-col justify-between' style={{ width: 192, minWidth: 192 }} >
      <div className='mt-5' >
        <SidebarLink name='Dashboard' href='/dashboard' icon={faCity} />
        <SidebarLink name='Goals' href='/goals' icon={faBullseye} />
        <SidebarLink name='Propose Goal' href='/propose-goal' icon={faArrowAltCircleRight} />
        <SidebarLink name='Propose Event' href='/propose-event' icon={faCalendar} />
      </div>
      <button className='mb-5 mx-5 px-2 py-2 text-sm rounded-lg text-white bg-communify-green hover:bg-communify-green-alt transition ease-in duration-100' >
        <FontAwesomeIcon icon={faClipboard} className='mr-2' />
        Survey Availiable
      </button>
    </div>
  )
}

const SidebarLink = ({ name, href, icon }) => {
  const router = useRouter()

  const colorClasses = href === router.pathname ? 'text-communify-green' : 'text-white group-hover:text-communify-green'

  return (
    <Link href={href} passHref>
      <div className={'group mx-7 cursor-pointer mb-5'} >
        <FontAwesomeIcon icon={icon} className={'mr-4 transition ease-in duration-100 ' + colorClasses} />
        <a className={'transition ease-in duration-100 text-sm ' + colorClasses} >{name}</a>
      </div>
    </Link>
  )
}

const PageContent = ({ content }) => {
  return (
    <>
      {content}
    </>
  )
}


export default Navigation
