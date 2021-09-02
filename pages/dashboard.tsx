import React, { useState, useEffect, useContext } from 'react'
import Navigation from '../components/nav'
import AuthContext from '../context/authContext'
import Image from 'next/image'
import graphImg from '../public/graph.png'
import DoughnutChart from '../components/doughnut-chart'
import GoalModel from '../models/goal-model'
import firebase from 'firebase/app'
import 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Goals from './goals'
import Link from 'next/link'
import router from 'next/router'

const Dashboard = () => {
  const authCtx = useContext(AuthContext)

  const [goalsList, setGoalsList] = useState([])
  const [cityName, setCityName] = useState('Loading')
  const [stateName, setStateName] = useState('Loading')

  // Have to use useEffect for fetching data and for subscriptions
  useEffect(
    () => {
      const getGoals = async () => {
        //Gets the citycode the user is registered with

        let goalsListTemp = []

        try {
          const user = firebase.auth().currentUser
          var email = user.email

          user.getIdToken().then(async function (token) {
            const userRes = await axios.get(
              `https://communify-api.protosystems.net/v1/getUser-city-data?email=${email}&authID=${token}`
            )

            if (userRes.data.status == 'success') {
              const cityCode = userRes.data.userData.city

              const res = await axios.get(
                `https://communify-api.protosystems.net/v1/getGoals?limit=5&cityCode=${cityCode}`
              )
              let goals = await res.data.message
              console.log('RAW GOALS', goals)

              goals = goals.map((goal) => {
                console.log('goal', goal)
                let completedProjects = 0
                let totalProjects = 0
                for (let i = 0; i < goal.projects.length; i++) {
                  if (goal.projects[i].applicationStatus == 'accepted') {
                    totalProjects++
                  }

                  if (
                    goal.projects[i].applicationStatus == 'accepted' &&
                    goal.projects[i].currentStatus == 'completed'
                  ) {
                    completedProjects++
                  }
                }

                if (totalProjects == 0) {
                  totalProjects = 1
                }

                goalsListTemp.push(
                  new GoalModel(
                    goal.goalName,
                    goal.dateCreated,
                    goal.estimatedFinish,
                    completedProjects,
                    totalProjects - completedProjects,
                    goal.goalID
                  )
                )
              })

              setGoalsList(goalsListTemp)

              setCityName(userRes.data.cityData.city)
              setStateName(userRes.data.cityData.state)

              console.log('goals', goals)
            }
          })
        } catch (e) {
          console.log('error occurred', e)
        }
      }

      // async await so I used a separate function
      getGoals()

      // cancel subscriptions in the return fn
      //  return () => {}
    },
    [
      // rerender the useEffect fn
      // nothing here = it only runs once at the beginning,
      // if you put something here = it runs when that value changes
    ]
  )

  return (
    <Navigation>
      <div className='flex flex-col py-6 pl-6 pr-12 w-full min-w-0 bg-background-gray'>
        {/* <div className="flex mt-2 mb-2 overflow-x-scroll">
          <h1>testtesttestesttesttesttestesttesttesttestest</h1>
          <h1>testtesttestesttesttesttestesttesttesttestest</h1>
          <h1>testtesttestesttesttesttestesttesttesttestest</h1>
          <h1>testtesttestesttesttesttestesttesttesttestest</h1>
          <h1>testtesttestesttesttesttestesttesttesttestest</h1>
          <h1>testtesttestesttesttesttestesttesttesttestest</h1>
        </div> */}
        <GoalList goals={goalsList} cityName={cityName} state={stateName} />
        <div className='flex-grow flex min-h-0'>
          <PopularProjects />
          <UpcomingEvents />
        </div>
      </div>
    </Navigation>
  )
}

const GoalList: React.FC<{
  goals: GoalModel[]
  cityName: string
  state: string
}> = (props) => {
  return (
    <div className='w-full min-w-0 flex flex-col'>
      <div className='flex items-end'>
        <h1 className=' text-2xl font-semibold'>Dashboard</h1>
        <p className='ml-4 text-communify-green'>
          City of {props.cityName}, {props.state}
        </p>
      </div>
      <div className='mt-6 text-sm flex justify-between'>
        <p>Current Goals</p>
        <p className='cursor-pointer font-semibold text-communify-green'>
          <Link href='/goals'>View All</Link>
        </p>
      </div>
      <div className='w-full min-w-0 flex mt-2 overflow-auto'>
        {/* only get 5 goals */}
        {props.goals.map((goal, index) => {
          return (
            <Goal
              key={index}
              name={goal.name}
              started={goal.startDate}
              finish={goal.estimatedFinishDate}
              complete={`${
                goal.completedProjects / goal.unFinishedProjects +
                  goal.completedProjects * 100 || 0
              }%`}
              margin={index === 4 ? '' : 'mr-4'}
              completedProjects={goal.completedProjects}
              unFinishedProjects={goal.unFinishedProjects}
              id={goal.id}
            />
          )
        })}
      </div>
    </div>
  )
}

const Goal: React.FC<{
  name: string
  started: string
  finish: string
  complete: string
  margin: string
  completedProjects: number
  unFinishedProjects: number
  id: number
}> = (props) => {
  const clickHandler = () => {
    console.log('test', props.id)
    router.push('/goals/' + props.id)
  }

  return (
    <div
      className={`px-6 py-6 w-full flex flex-col justify-top items-center bg-communify-black rounded-3xl cursor-pointer ${props.margin}`}
      onClick={clickHandler}
    >
      <div className='relative'>
        {/* <Image src={graphImg} alt='Graph' height='120' width='120' /> */}

        <div className='w-36 mx-5'>
          <DoughnutChart
            cutout='78%'
            dataList={[props.completedProjects, props.unFinishedProjects]}
          />
        </div>
        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center'>
          {props.complete}
          <br />
          Complete
        </p>
      </div>
      <h2 className='text-semibold text-lg mt-2 text-communify-green whitespace-nowrap'>
        {props.name}
      </h2>
      <p className='text-white whitespace-nowrap '>
        <span className='font-semibold text-sm'>Started:</span>
        <span className='text-sm'> {props.started}</span>
      </p>
      <p className='text-white whitespace-nowrap'>
        <span className='font-semibold text-sm'>Estimated Finish:</span>
        <span className='text-sm'> {props.finish}</span>
      </p>
    </div>
  )
}

const PopularProjects = () => {
  return (
    <div className='flex-grow w-1/2 flex flex-col overflow-auto '>
      <p className='mt-6 w-full text-sm'>Current Popular Projects</p>
      <div className='mt-4 flex-grow overflow-auto'>Coming Soon...</div>
    </div>
  )
}

const UpcomingEvents = () => {
  return (
    <div className='flex-grow w-1/2 flex flex-col overflow-auto'>
      <p className='mt-6 w-full text-sm'>Upcoming Events</p>
      <div className='mt-4 flex-grow overflow-auto'>Coming Soon...</div>
    </div>
  )
}

export default Dashboard
