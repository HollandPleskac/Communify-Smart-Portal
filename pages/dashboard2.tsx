import React from 'react'
import Navigation from '../components/nav'

const Dashboard2 = () => {
  return (
    <Navigation>
      <div className="w-full bg-red-400 overflow-hidden">
        <h1>text content for a title</h1>
        <div className="w-full flex bg-green-400 overflow-auto ">
          <Comp />
          <Comp />
          <Comp />
          <Comp />
          <Comp />
          <Comp />
          <Comp />
          <Comp />
        </div>
      </div>
    </Navigation>
  )
}

const Comp = () => {
  return (
    <div className="p-6 border-2 border-gray-200 ">
      <p className="whitespace-nowrap">testing22 test2 test3</p>
    </div>
  )
}

export default Dashboard2
