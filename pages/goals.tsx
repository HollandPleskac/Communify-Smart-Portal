import React, { useEffect, useState } from 'react'
import Navigation from '../components/nav'
import AuthContext from '../context/authContext'
import Image from 'next/image'
import goalsGraph from '../public/goals-graph.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import firebase from 'firebase/app'
import 'firebase/auth'


const Goals = () => {



  return (
    <Navigation>
      <div className='p-6 w-full flex gap-x-5 bg-background-gray'>
        <div className='w-9/12 flex flex-col'>
          <Title />
          <GoalList /> 
        </div>
        <div className='w-3/12 flex flex-col '>
          <div>
            {/* replace with real chart */}
            <Image src={goalsGraph} alt='Goals Graph' />
          </div>
          <p className='text-sm mt-6'>Recently Completed Goals</p>
          <div className='mt-4 flex-grow overflow-auto'>
            <RecentlyCompletedGoal
              name='Improve Parking at Mall'
              estFinish='2022'
            />

          </div>
        </div>
      </div>
    </Navigation>
  )
}

const Title = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-end'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <p className='ml-4 text-communify-green'>
          City of Stockton, California
        </p>
      </div>
      <button className='text-sm px-3 py-2 rounded-lg text-white bg-communify-green hover:bg-communify-green-alt focus:bg-communify-green-alt'>
        Propose Goal
      </button>
    </div>
  )
}

const GoalList = () => {
  // [read, write(use the function)] = useState(type of data)
  const [goals, setGoals] = useState([])

  // Have to use useEffect for fetching data and for subscriptions
  useEffect(() => {
    const getGoals = async () => {

      //Gets the citycode the user is registered with

      const user = firebase.auth().currentUser;

      //console.log(user.email)

      var email = user.email

      const userRes = await axios.get(
        `https://communify-api.protosystems.net/v1/getUser?email=${email}`
      )

      console.log(userRes.data)


      if(userRes.data.status == 'success'){

        const cityCode = userRes.data.message.city
        //fetch data

        console.log(cityCode)
        const res = await axios.get(
          `https://communify-api.protosystems.net/v1/getGoals?limit=none&cityCode=${cityCode}`
        )

        console.log('got goals')
        console.log('res', res.data)
        

        // Filters list to take out pending

        for(let i = 0; i <= res.data.message.length - 1; i++){
          if(res.data.message[i]['currentStatus'] == 'pending'){
            res.data.message.splice(i, i)
          }
        }

        // set data into useState
        setGoals(res.data.message)
      } else {
        console.log("Error fetching user from API")
      }



    }

    // async await so I used a separate function
    getGoals()

    // cancel subscriptions in the return fn
    //  return () => {}
  }, [
    // rerender the useEffect fn
    // nothing here = it only runs once at the beginning,
    // if you put something here = it runs when that value changes
  ])

  return (
    <div className='h-full flex flex-col mt-2 overflow-auto'>
      {/* map, have the specify the key */}
      {goals.map((goal, index) => (
        <Goal
          key={index}
          name={goal.goalName}
          estFinish={goal.estimatedFinish}
          status={(goal.currentStatus == 'inProgress') ? 'In Progress': goal.currentStatus}
        />
      ))}

      {/* <Goal name='Promote Carpooling' estFinish='July 2022' />
      <Goal name='Promote Carpooling' estFinish='July 2022' />
      <Goal name='Promote Carpooling' estFinish='July 2022' />
      <Goal name='Promote Carpooling' estFinish='July 2022' />
      <Goal name='Promote Carpooling' estFinish='July 2022' /> */}
    </div>
  )
}

const Goal: React.FC<{ name: string; estFinish: string; status: string}> = (props) => {
  return (
    <div className='relative mt-4 p-4 flex bg-white rounded-lg w-full '>
      <div className='h-full w-2 rounded-full mr-4 ml-1 bg-communify-black'></div>
      <div className='flex flex-col py-2'>
        <h1 className='text-lg font-semibold text-communify-black'>
          {props.name}
        </h1>
        <h2 className='ml-1 text-sm mt-1'>Est Finish: {props.estFinish}</h2>
      </div>
      <p className='absolute top-2 right-4'>{props.status}</p>
    </div>
  )
}

const RecentlyCompletedGoal: React.FC<{ name: string; estFinish: string }> = (
  props
) => {
  return (
    <div className='bg-white rounded-lg px-6 py-4 mt-3 flex justify-between items-center'>
      <div>
        <h1 className='font-semibold mb-1'>{props.name}</h1>
        <h2 className='text-sm'>Est Finish: {props.estFinish}</h2>
      </div>
      <FontAwesomeIcon
        icon={faCheckCircle}
        className='text-3xl text-communify-green'
      />
    </div>
  )
}

export default Goals
