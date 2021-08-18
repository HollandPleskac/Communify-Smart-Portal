import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Navigation from '../components/nav'

const ProposeEvent = () => {
  const [name, setName] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  return (
    <Navigation>
      <div className='flex flex-col w-full p-6'>
        <Title />
        <div className='h-full flex justify-center my-6 min-h-0'>
          <div className='h-full w-5/12 flex flex-col items-center p-8 rounded-3xl bg-communify-black'>
            <h1 className='text-xl font-semibold text-white'>Propose Event</h1>
            <InputGroup
              labelName='Event Name'
              id='event-name'
              marginTop='mt-6'
              value={name}
              setValue={setName}
            />
            <InputGroup
              labelName='Event Date'
              id='event-date'
              marginTop='mt-5'
              value={date}
              setValue={setDate}
            />
            <LargeInput
              labelName='Event Description'
              id='event-description'
              marginTop='mt-5'
              value={description}
            />
            <Buttons />
          </div>
        </div>
      </div>
    </Navigation>
  )
}

const InputGroup: React.FC<{
  labelName: string
  marginTop: string
  id: string
  value: string
  setValue: (val: string) => void
}> = (props) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    console.log(e.target)
    props.setValue(e.target.value)
  }

  return (
    <div className={`w-full px-8 flex flex-col ${props.marginTop}`}>
      <label
        htmlFor={props.id}
        className='mb-2 text-communify-green cursor-pointer'
      >
        {props.labelName}
      </label>
      <input
        value={props.value}
        onChange={changeHandler}
        type='text'
        id={props.id}
        className='px-4 py-2 rounded-lg w-full focus:outline-none text-communify-black'
      />
    </div>
  )
}

const LargeInput: React.FC<{
  labelName: string
  marginTop: string
  id: string
  value: string
}> = (props) => {
  return (
    <div className={`w-full px-8 mt-8 flex flex-col h-full ${props.marginTop}`}>
      <label
        htmlFor={props.id}
        className='mb-2 text-communify-green cursor-pointer'
      >
        {props.labelName}
      </label>
      <textarea
        value={props.value}
        id={props.id}
        className='h-full px-4 py-2 rounded-lg w-full focus:outline-none text-communify-black resize-none'
      ></textarea>
      {/* <input
        type='text'
        id='event-input'
        className='px-4 py-2 rounded-lg w-full focus:outline-none text-communify-black'
      /> */}
    </div>
  )
}

const Buttons = () => {
  return (
    <div className='w-full flex justify-evenly mt-8'>
      <button className='px-4 py-2 rounded-lg text-communify-green bg-white border-2 border-communify-green hover:border-communify-green-alt hover:text-communify-green-alt focus:border-communify-green-alt focus:text-communify-green-alt transition ease-in duration-100'>
        Upload Photo
      </button>
      <button className='px-4 py-2 rounded-lg text-white bg-communify-green border-2 border-communify-green hover:bg-communify-green-alt hover:border-communify-green-alt focus:border-communify-green-alt focus:bg-communify-green-alt transition ease-in duration-100'>
        Create Event
      </button>
    </div>
  )
}

const Title = () => {
  const router = useRouter()

  return (
    <div className='flex items-end'>
      {/* server side render the goal name */}
      <h1 className='text-2xl font-semibold'>Propose Event</h1>
      <p className='ml-4 text-communify-green'>City of Stockton, California</p>
    </div>
  )
}

export default ProposeEvent
