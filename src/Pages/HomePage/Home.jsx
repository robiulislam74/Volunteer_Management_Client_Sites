import React, { useEffect, useState } from 'react'
import BannerSlider from '../../components/BannerSlider'
import axios from 'axios'
import Heading from '../../components/Heading'
import VolunteersNeedsNow from '../../components/VolunteersNeedsNow'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'


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
      <Helmet>
        <title>Volunteer | Home</title>
      </Helmet>
      <BannerSlider />
      <div className='mt-24'>
      <Heading
        title={'Volunteer Needs Now'}
        subTitle={'Act swiftly to make a difference! Explore urgent opportunities to volunteer and support causes that matter most. Upcoming deadlines are fast approaching—find your role today.'}
      />
      </div>
      <div className='max-w-screen-lg mb-24 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          volunteers.map(volunteer=> 
          <VolunteersNeedsNow 
          key={volunteer._id} 
          volunteer={volunteer}
          />)
        }
        <NavLink to={'/allVolunteers'}>
        <button className='text-left font-semibold text-xl text-lime-600 inline-block hover:text-blue-700 underline pb-3'>See All ...</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Home