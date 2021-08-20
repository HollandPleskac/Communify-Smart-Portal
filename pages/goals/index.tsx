import React, { useEffect, useState } from 'react'
import Navigation from '../../components/nav'
import AuthContext from '../../context/authContext'
import Image from 'next/image'
import goalsGraph from '../../public/goals-graph.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import DoughnutChart from '../../components/doughnut-chart'
import Link from 'next/link'
import firebase from 'firebase/app'
import 'firebase/auth'
import next from 'next'

const Goals = () => {
  // [read, write(use the function)] = useState(type of data)
  const [goals, setGoals] = useState([])
  const [cityName, setCityName] = useState('Loading')
  const [stateName, setStateName] = useState('Loading')
  const [remainingGoalsCount, setRemainingGoalsCount] = useState(0)
  const [completedGoalsCount, setCompletedGoalsCount] = useState(0)
  const [completedGoals, setCompletedGoals] = useState([])
  const [goalStats, setGoalStats] = useState({})

  // Have to use useEffect for fetching data and for subscriptions
  useEffect(
    () => {
      const getGoals = async () => {
        //Gets the citycode the user is registered with

        const user = firebase.auth().currentUser

        console.log(user)

        var email = user.email

        user.getIdToken().then(async function (token) {
          const userRes = await axios.get(
            `https://communify-api.protosystems.net/v1/getUser-city-data?email=${email}&authID=${token}`
          )

          console.log(userRes.data)

          if (userRes.data.status == 'success') {
            const cityCode = userRes.data.userData.city

            console.log(cityCode)

            const res = await axios.get(
              `https://communify-api.protosystems.net/v1/getGoals?limit=none&cityCode=${cityCode}`
            )

            console.log('got goals')
            console.log('res', res.data)

            // Gets finished goals

            let finishedGoalsTemp = []
            let inProgresGoals = []

            // Filters list to take out pending

            let completedGoalsCount = 0
            let inPendingGoalsCount = 0
            let totalGoalCount = 0



            totalGoalCount = res.data.message.length

            for (let i = 0; i <= res.data.message.length - 1; i++) {
              if (res.data.message[i]['currentStatus'] == 'completed') {
                finishedGoalsTemp.push(res.data.message[i])
              }
            }

            completedGoalsCount = finishedGoalsTemp.length

            // Filters list to take out pending

            for (let i = 0; i <= res.data.message.length - 1; i++) {
              if (
                res.data.message[i]['currentStatus'] == 'inProgress' ||
                res.data.message[i]['currentStatus'] == 'pending'
              ) {
                inProgresGoals.push(res.data.message[i])
              }
            }


            var approvedTotalGoals = 0

            for (let i = 0; i <= res.data.message.length - 1; i++) {
              if (
                res.data.message[i]['applicationStatus'] != 'pending' &&
                res.data.message[i]['currentStatus'] != 'pending'
              ) {
                approvedTotalGoals++
              } 

              
            }

          inPendingGoalsCount = inProgresGoals.length

          setRemainingGoalsCount(approvedTotalGoals-completedGoalsCount)
          setCompletedGoalsCount(completedGoalsCount)

          // set data into useState
          setGoals(inProgresGoals)
          setCityName(userRes.data.cityData.city)
          setStateName(userRes.data.cityData.state)
          setCompletedGoals(finishedGoalsTemp)
          setGoalStats({
            pending: inPendingGoalsCount,
            completed: completedGoalsCount,
            total: totalGoalCount,
          })

          console.log({
            pending: inPendingGoalsCount,
            completed: completedGoalsCount,
            total: totalGoalCount,
          })
        } else {
          console.log("Error fetching user from API: " +  userRes.data.message)
        }
      });

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
      <div className='p-6 w-full flex gap-x-5 bg-background-gray'>
        <div className='w-9/12 flex flex-col'>
          <Title cityName={cityName} stateName={stateName} />
          <GoalList goals={goals} />
        </div>
        <div className='w-3/12 flex flex-col '>
          <div>
            {/* replace with real chart */}

            <GoalChart complete={completedGoalsCount} remaining={remainingGoalsCount} />

            {/* <Image src={goalsGraph} alt='Goals Graph' /> */}
          </div>
          <p className='text-sm mt-6'>Recently Completed Goals</p>
          <div className='mt-4 flex-grow overflow-auto'>
            <RecentlyCompletedGoals completedGoals={completedGoals} />
          </div>
        </div>
      </div>
    </Navigation>
  )
}

const Title: React.FC<{ cityName: string; stateName: string }> = (props) => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-end'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <p className='ml-4 text-communify-green'>
          City of {props.cityName}, {props.stateName}
        </p>
      </div>

      <Link href="/propose-goal">
      <button className='text-sm px-3 py-2 rounded-lg text-white bg-communify-green hover:bg-communify-green-alt focus:bg-communify-green-alt'>
        Propose Goal
      </button>
      </Link>

    </div>
  )
}

const GoalList: React.FC<{ goals: any }> = (props) => {
  return (
    <div className='h-full flex flex-col mt-2 overflow-auto'>
      {/* map, have the specify the key */}
      {props.goals.map((goal, index) => (
        <Goal
          key={index}
          name={goal.goalName}
          estFinish={goal.estimatedFinish}
          status={
            goal.currentStatus == 'inProgress'
              ? 'In Progress'
              : goal.currentStatus == 'pending'
              ? 'Pending Approval'
              : goal.currentStatus
          }
          goalID={goal.goalID}
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

const GoalChart: React.FC<{ remaining: number; complete: number }> = (
  props
) => {
  return (
    <div className='bg-communify-black flex justify-evenly py-6 px-2 rounded-3xl'>
      <div className='flex flex-col'>
        <h2 className='text-communify-green text-semibold'>Overall Progress</h2>
        <div className='h-full flex flex-col justify-center'>
          <GoalChartHeading value={props.remaining} title='Goals Remaining' />
          <GoalChartHeading value={props.complete} title='Goals Completed' />
          <GoalChartHeading
            value={props.remaining + props.complete}
            title='Goals Total'
          />
        </div>
      </div>
      <div>
        <div className='relative'>
          {/* <Image src={graphImg} alt='Graph' height='120' width='120' /> */}

          <div className='w-36'>
            <DoughnutChart
              cutout='78%'
              dataList={[props.complete, props.remaining]}
            />
          </div>
          <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center'>
            {Math.round((props.complete / (props.remaining + props.complete)) * 100)}%
            <br />
            Complete
          </p>
        </div>
        <div className='flex flex-col'>
          <GoalChartKey name='Goals Completed' color='bg-communify-green' />
          <GoalChartKey
            name='Goals Remaining'
            color='bg-communify-chart-green-alt'
          />
        </div>
      </div>
    </div>
  )
}

const GoalChartHeading: React.FC<{ value: number; title: string }> = (
  props
) => {
  return (
    <>
      <div className='text-white text-center mt-2'>
        <h3 className='text-xl font-semibold mb-1'>{props.value}</h3>
        <p className='text-xs'>{props.title}</p>
      </div>
    </>
  )
}

const GoalChartKey: React.FC<{ name: string; color: string }> = (props) => {
  return (
    <div className='flex items-center mt-3'>
      <div className={`rounded-full w-4 h-4 mr-2 ${props.color}`}></div>
      <p className='text-sm text-white'>{props.name}</p>
    </div>
  )
}

const Goal: React.FC<{
  name: string
  estFinish: string
  status: string
  goalID: string
}> = (props) => {
  return (
    <Link href={`/goals/${props.goalID}`}>
      <div className='relative mt-4 p-4 flex bg-white rounded-lg w-full cursor-pointer'>
        <div className='h-full w-2 rounded-full mr-4 ml-1 bg-communify-black'></div>
        <div className='flex flex-col py-2'>
          <h1 className='text-lg font-semibold text-communify-black'>
            {props.name}
          </h1>
          <h2 className='ml-1 text-sm mt-1'>Est Finish: {props.estFinish}</h2>
        </div>
        <p className='absolute top-2 right-4'>{props.status}</p>
      </div>
    </Link>
  )
}

const RecentlyCompletedGoals: React.FC<{ completedGoals: any }> = (props) => {
  return (
    <div className='h-full flex flex-col mt-2 overflow-auto'>
      {/* map, have the specify the key */}
      {props.completedGoals.map((goal: any, index: number) => (
        <div
          key={index}
          className='bg-white rounded-lg px-6 py-4 mt-3 flex justify-between items-center'
        >
          <div>
            <h1 className='font-bold mb-1'>{goal.goalName}</h1>
            <h2 className='text-sm'>Est Finish: {goal.estimatedFinish}</h2>
          </div>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className='text-3xl text-communify-green'
          />
        </div>
      ))}

      {/* <Goal name='Promote Carpooling' estFinish='July 2022' />
      <Goal name='Promote Carpooling' estFinish='July 2022' />
      <Goal name='Promote Carpooling' estFinish='July 2022' />
      <Goal name='Promote Carpooling' estFinish='July 2022' />
      <Goal name='Promote Carpooling' estFinish='July 2022' /> */}
    </div>
  )
}

export default Goals
