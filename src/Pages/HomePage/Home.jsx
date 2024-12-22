import React, { useEffect, useState } from 'react'
import BannerSlider from '../../components/BannerSlider'
import axios from 'axios'
import Heading from '../../components/Heading'
import VolunteersNeedsNow from '../../components/VolunteersNeedsNow'


const Home = () => {
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    getVolunteersFunc()
  }, [])

  const getVolunteersFunc = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/volunteers`)
      .then(res => setVolunteers(res.data))
  }


  return (
    <div>
      <BannerSlider />
      <Heading
        title={'Volunteer Needs Now'}
        subTitle={'Act swiftly to make a difference! Explore urgent opportunities to volunteer and support causes that matter most. Upcoming deadlines are fast approaching—find your role today.'}
      />
      <div className='max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          volunteers.map(volunteer=> 
          <VolunteersNeedsNow 
          key={volunteer._id} 
          volunteer={volunteer}
          />)
        }
      </div>
    </div>
  )
}

export default Home