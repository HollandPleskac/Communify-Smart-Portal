import React from 'react'
import Navigation from '../components/nav'
import DoughnutChart from '../components/doughnut-chart'

const TestPage = () => {
  return (
    <Navigation>
      <div className='p-6 w-full flex gap-x-5 bg-background-gray'>
        <div className='w-9/12 flex flex-col bg-red-100'></div>
        <div className='w-3/12 flex flex-col bg-blue-100 '>
          <GoalChart />
        </div>
      </div>
    </Navigation>
  )
}

const GoalChart = () => {
  return (
    <div className='bg-communify-black flex justify-evenly py-6 px-2 rounded-3xl'>
      <div className='flex flex-col'>
        <h2 className='text-communify-green text-semibold'>Overall Progress</h2>
        <div className='h-full flex flex-col justify-center'>
          <GoalChartHeading value={35} title='Goals Remaining' />
          <GoalChartHeading value={70} title='Goals Completed' />
          <GoalChartHeading value={105} title='Goals Total' />
        </div>
      </div>
      <div>
        <div className='relative'>
          {/* <Image src={graphImg} alt='Graph' height='120' width='120' /> */}

          <div className='w-36'>
            <DoughnutChart cutout='78%' dataList={[19, 12]} />
          </div>
          <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center'>
            35%
            <br />
            Complete
          </p>
        </div>
        <div className='flex flex-col'>
          <GoalChartKey name='Goals Remainging' color='bg-communify-green' />
          <GoalChartKey
            name='Goals Completed'
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

export default TestPage
