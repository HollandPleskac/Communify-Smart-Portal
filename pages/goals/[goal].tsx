import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navigation from '../../components/nav'
import Image from 'next/image'
import graphImg from '../../public/graph.png'
import DoughnutChart from '../../components/doughnut-chart'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase/app'
import 'firebase/auth'
import Link from 'next/link'
import ProposeEvent from '../propose-event'

const Goals = () => {
  const router = useRouter()

  const [projects, setProjects] = useState([])

  /*
  <ProjectProposal
    name='Plant Trees'
    type='project'
    estFinish='2022'
    upVotes={420}
    inProgress={false}
  />,             <ProjectProposal
  name='Plant Trees'
  type='proposal'
  estFinish='2022'
  upVotes={420}
  inProgress={true}
/>

*/
  const [description, setDescription] = useState('')
  const [cityName, setCityName] = useState('Loading')
  const [stateName, setStateName] = useState('Loading')

  const [recentUpdates, setRecentUpdates] = useState([])
  const [goalName, setGoalName] = useState('Loading')
  const [projectGraphStatus, setProjectGraphStatus] = useState([0,0])

  // Backend

  function upvote(id){
    console.log('upvote: ' + id)
  }

  useEffect(
    () => {
      const getGoalData = async () => {
        //Gets the citycode the user is registered with

        const user = firebase.auth().currentUser

        console.log(user)

        var email = user.email
        const userRes = await axios.get(
          `https://communify-api.protosystems.net/v1/getUser?email=${email}`
        )

        console.log(userRes.data)

        

        if (userRes.data.status == 'success') {
          const cityCode = userRes.data.message.city
          //fetch data

          console.log(cityCode)

          const resCityName = await axios.get(
            `https://communify-api.protosystems.net/v1/getCityData?cityCode=${cityCode}`
          )

          console.log(resCityName.data)
  

          const res = await axios.get(
            `https://communify-api.protosystems.net/v1/getGoalData?cityCode=${cityCode}&goalID=${router.query.goal}`
          )

          console.log('got goal info')
          console.log('res', res.data)

          setGoalName(res.data.message.goalName)
          setCityName(resCityName.data.message.city)
          setStateName(resCityName.data.message.state)
          setDescription(res.data.message.description)

          let projectsForGoal = res.data.message.projects

          let projectsTemp = []

          let completedProjects = 0

          let totalProjects = 0


          for(let i = 0; i <= projectsForGoal.length - 1; i++){

            if(projectsForGoal[i]['applicationStatus'] == 'accepted'){
              totalProjects++
            }

              if(projectsForGoal[i]['applicationStatus'] == 'accepted' && projectsForGoal[i]['currentStatus'] == 'completed'){
                completedProjects++
              }
              projectsTemp.push(

                /*
applicationStatus: "accepted"
​​​​
cityCode: "981776"
​​​​
completeDate: "none"
​​​​
completeTimestamp: "none"
​​​​
createdDate: "08/17/2021"
​​​​
createdTimestamp: "1629252272"
​​​​
creatorEmail: "krishnatechpranav@gmail.com"
​​​​
currentStatus: "inProgress"
​​​​
description: "Hello"
​​​​
estimatedFinish: "10/20/2021"
​​​​
parentGoalID: "6861605715"
​​​​
projectID: "919330266983570"
​​​​
projectName: "Pick up trash"
​​​​
projectType: "official"
​​​​
upvotes: 0


\

                */
                <ProjectProposal
                  name={projectsForGoal[i]['projectName']}
                  type={(projectsForGoal[i]['projectType'] == 'official') ? 'project' : 'proposal'}
                  estFinish={projectsForGoal[i]['estimatedFinish']}
                  upVotes={projectsForGoal[i]['upvotes']}
                  inProgress={(projectsForGoal[i]['currentStatus'] == 'inProgress')? true: false}
                  applicationApproved={(projectsForGoal[i]['applicationStatus'] == 'accepted')? true: false}
                  upvote={upvote(projectsForGoal[i]['projectID'])}
                />
              )

          }

          if(totalProjects == 0 && completedProjects == 0){
            totalProjects = 1
            completedProjects = 0
          }



          setProjects(projectsTemp)
          setProjectGraphStatus([completedProjects, totalProjects]) // IMPORTANT REMINDER: Pending projects are not factored into graph totals

          

          // Gets finished goals

          /*

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

          inPendingGoalsCount = inProgresGoals.length

          // set data into useState
          setGoals(inProgresGoals)
          setCityName('Mountain House')
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

          */
        } else {
          console.log('Error fetching user from API')
        }
      }

      // async await so I used a separate function
      getGoalData()

      // cancel subscriptions in the return fn
      //  return () => {}
    },
    [
      // rerender the useEffect fn
      // nothing here = it only runs once at the beginning,
      // if you put something here = it runs when that value changes
    ]
  )


  useEffect(() => {
    console.log('testing')
    console.log(router.query.goal)
  }, [router.query])
  return (
    <Navigation>
      <div className=' w-full flex p-6 gap-x-16 bg-background-gray'>
        <div className='flex flex-col w-8/12'>
          <Title goalName = {goalName} cityname={cityName} state={stateName}/>
          <p className='mt-4 px-6 py-8 bg-communify-green rounded-lg text-white'>
            {description}
          </p>
          <div className='mt-6 mb-2 flex items-center justify-between'>
            <p>Current Projects/Proposals</p>
            <button className='p-2 rounded-lg text-sm text-white bg-communify-green hover:bg-communify-green-alt'>
              Create Project Proposal
            </button>
          </div>
          <div className='overflow-y-auto'>

            {projects}



          
          </div>
        </div>
        <div className='flex flex-col w-4/12'>
          <GoalProgress projectGraphStatus = {projectGraphStatus}/>
          <p className='text-sm mt-4 mb-2'>Recent Updates</p>
          <div className='flex-grow overflow-y-auto'>
            <RecentUpdate
              name='Assemble Playground in park'
              project='Improve our Parks'
            />
            <RecentUpdate
              name='Assemble Playground in park'
              project='Improve our Parks'
            />
            <RecentUpdate
              name='Assemble Playground in park'
              project='Improve our Parks'
            />
            <RecentUpdate
              name='Assemble Playground in park'
              project='Improve our Parks'
            />
            <RecentUpdate
              name='Assemble Playground in park'
              project='Improve our Parks'
            />
          </div>
        </div>
      </div>
    </Navigation>
  )
}

const Title:React.FC<{ goalName: string; cityname: string; state: string }> = (props) => {
  const router = useRouter()

  return (
    <div className='flex items-end'>
      {/* server side render the goal name */}
      <h1 className='text-2xl font-semibold'>{props.goalName}</h1>
      <p className='ml-4 text-communify-green'>City of {props.cityname}, {props.state}</p>
    </div>
  )
}

const ProjectProposal: React.FC<{
  name: string
  type: string
  estFinish: string
  upVotes: number
  inProgress: boolean
  applicationApproved: boolean
  upvote: any
}> = (props) => {
  return (
    <div className='flex justify-between items-center mt-3 px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center'>
        <div className='flex flex-col items-center mr-4'>
          <Triangle color='gray'/>
          <p className='mt-1'>{props.upVotes}</p>
        </div>
        <div>
          <div className='flex'>
            <h2 className='font-semibold'>{props.name}</h2>
            {props.type === 'proposal' && (
              <h3 className='ml-3 p-1 text-sm text-white bg-communify-green rounded-lg'>
                 Proposal 
              </h3>
            )}
            {props.type === 'project' && (
              <h3 className='ml-3 p-1 text-sm text-white bg-gray-400 rounded-lg'>
                 Official Project 
              </h3>
            )}
          </div>
          <p className='text-sm mt-1'>Est Finish: {props.estFinish}</p>
        </div>
      </div>
      {(props.inProgress && props.applicationApproved) && (
        <p className='text-communify-green font-semibold'>In Progress</p>
      )}
      
      {(!props.inProgress && props.applicationApproved) && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className='text-4xl text-communify-green mr-4'
        />
      )}

      {(props.applicationApproved == false) && (
        <p className='text-yellow-400 font-semibold'>Pending approval</p>
      )}
    </div>
  )
}

const GoalProgress:React.FC<{ projectGraphStatus: any;}> = (props) => {
  return (
    <div className='flex flex-col bg-communify-black rounded-2xl p-6'>
      <p className='font-semibold text-communify-green'>Goal Progress</p>
      <div className='relative mx-auto mt-2'>
        {/* <Image src={graphImg} alt='graph' /> */}
        <div className='w-44'>
          <DoughnutChart cutout='78%' dataList={props.projectGraphStatus} />
        </div>

        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg text-center '>
          {Math.round((props.projectGraphStatus[0]/ (props.projectGraphStatus[1])) * 100)}% Complete
        </p>
      </div>
      <div className='flex mt-4 justify-center text-white'>
        <div className='flex items-center justify-center mr-4'>
          <div className='rounded-full w-4 h-4 bg-communify-green mr-1'></div>
          Projects Completed
        </div>
        <div className='flex items-center justify-center'>
          <div className='rounded-full w-4 h-4 bg-communify-chart-green-alt mr-1'></div>
          Projects Remaining
        </div>
      </div>
    </div>
  )
}

const RecentUpdate: React.FC<{ name: string; project: string }> = (props) => {
  return (
    <div className='bg-white rounded-lg px-5 py-4 mt-3'>
      <h2 className='font-semibold '>{props.name}</h2>
      <p className='text-sm mt-1'>Project: {props.project}</p>
    </div>
  )
}

const Triangle: React.FC<{ color: string; }> = (props) => {
  return (
    <button>
      <div className='w-11 overflow-hidden inline-block' >
        <div className=' h-7 w-7 bg-black rotate-45 transform origin-bottom-left'></div>
      </div>
    </button>


  )
}

export default Goals
