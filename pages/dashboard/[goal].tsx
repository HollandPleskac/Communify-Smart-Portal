import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Navigation from '../../components/nav'
import Image from 'next/image'
import graphImg from '../../public/graph.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Goals = () => {
  const router = useRouter()

  useEffect(() => {
    console.log('testing')
    console.log(router.query.goal)
  }, [router.query])
  return (
    <Navigation>
      <div className=' w-full flex p-6 gap-x-16 bg-background-gray'>
        <div className='flex flex-col w-8/12'>
          <Title />
          <p className='mt-4 px-6 py-8 bg-communify-green rounded-lg text-white'>
            Our parks include outdated play structure that is not safe for
            children. We hope to improve our parks with better updated equipment
            and enforece better safety standards in accordance with city and
            county laws. We need the help of our community members to help make
            this possible.
          </p>
          <div className='mt-6 mb-2 flex items-center justify-between'>
            <p>Current Projects/Proposals</p>
            <button className='p-2 rounded-lg text-sm text-white bg-communify-green hover:bg-communify-green-alt'>
              Create Project Proposal
            </button>
          </div>
          <div className='overflow-y-auto'>
            <ProjectProposal
              name='Plant Trees'
              type='project'
              estFinish='2022'
              upVotes={420}
              inProgress={false}
            />
            <ProjectProposal
              name='Plant Trees'
              type='proposal'
              estFinish='2022'
              upVotes={420}
              inProgress={true}
            />
            <ProjectProposal
              name='Plant Trees'
              type='proposal'
              estFinish='2022'
              upVotes={420}
              inProgress={true}
            />
            <ProjectProposal
              name='Plant Trees'
              type='proposal'
              estFinish='2022'
              upVotes={420}
              inProgress={true}
            />
            <ProjectProposal
              name='Plant Trees'
              type='proposal'
              estFinish='2022'
              upVotes={420}
              inProgress={true}
            />
          </div>
        </div>
        <div className='flex flex-col w-4/12'>
          <GoalProgress />
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

const Title = () => {
  const router = useRouter()

  return (
    <div className='flex items-end'>
      {/* server side render the goal name */}
      <h1 className='text-2xl font-semibold'>{router.query.goal}</h1>
      <p className='ml-4 text-communify-green'>City of Stockton, California</p>
    </div>
  )
}

const ProjectProposal: React.FC<{
  name: string
  type: string
  estFinish: string
  upVotes: number
  inProgress: boolean
}> = (props) => {
  return (
    <div className='flex justify-between items-center mt-3 px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center'>
        <div className='flex flex-col items-center mr-4'>
          <Triangle color='gray' />
          <p className='mt-1'>{props.upVotes}</p>
        </div>
        <div>
          <div className='flex'>
            <h2 className='font-semibold'>{props.name}</h2>
            {props.type === 'proposal' && (
              <h3 className='ml-3 p-1 text-sm text-white bg-communify-green rounded-lg '>
                proposal
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
      {props.inProgress && (
        <p className='text-communify-green font-semibold'>In Progress</p>
      )}
      {!props.inProgress && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className='text-4xl text-communify-green mr-4'
        />
      )}
    </div>
  )
}

const GoalProgress = () => {
  return (
    <div className='flex flex-col bg-communify-black rounded-2xl p-6'>
      <p className='font-semibold text-communify-green'>Goal Progress</p>
      <div className='relative mx-auto mt-2'>
        <Image src={graphImg} alt='graph' />
        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg text-center '>
          35% Complete
        </p>
      </div>
      <div className='flex mt-4 justify-center text-white'>
        <div className='flex items-center justify-center mr-4'>
          <div className='rounded-full w-4 h-4 bg-communify-green mr-1'></div>
          Projects Completed
        </div>
        <div className='flex items-center justify-center'>
          <div className='rounded-full w-4 h-4 bg-communify-green-alt mr-1'></div>
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

const Triangle: React.FC<{ color: string }> = (props) => {
  return (
    <div className='w-11 overflow-hidden inline-block'>
      <div className=' h-8 w-8 bg-black rotate-45 transform origin-bottom-left'></div>
    </div>
  )
}

export default Goals
