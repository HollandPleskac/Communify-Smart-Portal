import React, { useEffect,useState  } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Navigation from '../components/nav'
import firebase from 'firebase/app'
import 'firebase/auth'

const Proposegoal = () => {
  const [name, setName] = useState<string>('')
  const [estimatedFinish, setEstimatedFinish] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')
  const [successText, setSuccessText] = useState<string>('')

  const [cityName, setCityName] = useState('Loading')
  const [stateName, setStateName] = useState('Loading')
  const [email, setEmail] = useState('')
  const [cityCode, setCityCode] = useState('')

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

          setCityName(userRes.data.cityData.city)
          setStateName(userRes.data.cityData.state)
          setEmail(user.email)
          setCityCode(cityCode)

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


  async function handleClick (e){
    e.preventDefault()

    if(name && estimatedFinish && description){
      setErrorText("")

      const res = await axios.get(
        `https://communify-api.protosystems.net/v1/addGoal?creatorEmail=${email}&cityCode=${cityCode}&goalName=${name}&estimatedFinish=${estimatedFinish}&description=${description}`
      )

      console.log(res.data)

      if (res.data.status == 'success') {

        setSuccessText("Created goal")

      } else {
        setErrorText("Error: " + res.data.message)
      }

    } else {
      setErrorText("Cannot leave fields blank")
      setSuccessText("")
      console.log("Empty")
    }
 


 }

  return (
    <Navigation>
      <div className='flex flex-col w-full p-6'>
        <Title cityName={cityName} stateName={stateName}/>
        <div className='h-full flex justify-center my-6 min-h-0'>
          <div className='h-full w-5/12 flex flex-col items-center p-8 rounded-3xl bg-communify-black'>
            <h1 className='text-xl font-semibold text-white'>Propose Goal</h1>
            <InputGroup
              labelName='Proposal Name'
              id='event-name'
              marginTop='mt-6'
              value={name}
              setValue={setName}
            />
            <InputGroup
              labelName='Estimated Finish'
              id='event-date'
              marginTop='mt-5'
              value={estimatedFinish}
              setValue={setEstimatedFinish}
            />
            <LargeInput
              labelName='Description'
              id='event-description'
              marginTop='mt-5'
              value={description}
              setValue={setDescription}
            />

      <p className='text-sm font-semibold text-red-600 my-3'>{errorText}</p>
      <p className='text-sm font-semibold text-green-600'>{successText}</p>


             <div className='w-full flex justify-evenly mt-8'>
      <button className='px-4 py-2 rounded-lg text-communify-green bg-white border-2 border-communify-green hover:border-communify-green-alt hover:text-communify-green-alt focus:border-communify-green-alt focus:text-communify-green-alt transition ease-in duration-100'>
        Upload Photo
      </button>
      <button className='px-4 py-2 rounded-lg text-white bg-communify-green border-2 border-communify-green hover:bg-communify-green-alt hover:border-communify-green-alt focus:border-communify-green-alt focus:bg-communify-green-alt transition ease-in duration-100' onClick={handleClick}>
        Create Event
      </button>
    </div>
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
  setValue: (val: string) => void
}> = (props) => {

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setValue(e.target.value)
  }

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
        onChange={changeHandler}
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



const Title:React.FC<{ cityName: string; stateName: string }> = (props) => {
  const router = useRouter()

  return (
    <div className='flex items-end'>
      {/* server side render the goal name */}
      <h1 className='text-2xl font-semibold'>Propose Event</h1>
      <p className='ml-4 text-communify-green'>City of {props.cityName}, {props.stateName}</p>
    </div>
  )
}

export default Proposegoal
