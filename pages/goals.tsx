import React from 'react'
import Navigation from '../components/nav'
import AuthContext from '../context/authContext'

const Goals = () => {
  return (
    <Navigation>
      <div className="flex w-full min-w-0">
        <div className="w-9/12 bg-red-100">
          <div className="flex items-end overflow-x-auto">
            <h1 className="font-semibold text-lg mr-12 whitespace-nowrap	">
              Current Goals
            </h1>
            <h1 className="font-semibold text-lg mr-12 whitespace-nowrap	">
              Current Goals
            </h1>
            <h1 className="font-semibold text-lg mr-12 whitespace-nowrap	">
              Current Goals
            </h1>
            <h1 className="font-semibold text-lg mr-12 whitespace-nowrap	">
              Current Goals
            </h1>
            <h1 className="font-semibold text-lg mr-12 whitespace-nowrap	">
              Current Goals
            </h1>
            <p className="whitespace-nowrap	">City of Stockton</p>
            <h1 className="font-semibold text-lg mr-12 whitespace-nowrap	">
              Current Goals
            </h1>
            <p className="whitespace-nowrap	">City of Stockton</p>
            <h1 className="font-semibold text-lg mr-12 whitespace-nowrap	">
              Current Goals
            </h1>
            <p className="whitespace-nowrap	">City of Stockton</p>
          </div>
        </div>
        <div className="w-3/12 bg-red-300">other section</div>
      </div>
    </Navigation>
  )
}

export default Goals
