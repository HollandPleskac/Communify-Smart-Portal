import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Navigation from '../../components/nav'

const Goals = () => {
  const router = useRouter()

  useEffect(() => {
    console.log('testing')
    console.log(router.query.goal)
  }, [router.query])
  return (
    <Navigation>
      <div>
        goals <p>goals2</p>
      </div>
    </Navigation>
  )
}

export default Goals
