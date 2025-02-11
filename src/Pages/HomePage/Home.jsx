import React, { useEffect, useState } from 'react'
import BannerSlider from '../../components/BannerSlider'
import axios from 'axios'
import Heading from '../../components/Heading'
import VolunteersNeedsNow from '../../components/VolunteersNeedsNow'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BecomeAVolunteer from '../../components/BecomeAVolunteer'
import ImpactStories from '../../components/ImpactStories'
import UseContext from '../../Context/CustomHook/UseContext'


const Home = () => {
  const [volunteers, setVolunteers] = useState([])
  const { theme } = UseContext()

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

      {/* Banner Section */}
      <BannerSlider />

      {/* Heading Section */}
      <div className="mt-16 sm:mt-20 px-4">
        <Heading
          title="Volunteer Needs Now"
          subTitle="Act swiftly to make a difference! Explore urgent opportunities to volunteer and support causes that matter most. Upcoming deadlines are fast approaching—find your role today."
        />
      </div>

      {/* Volunteer Grid */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-12 lg:mt-12 px-4">
        {volunteers.map((volunteer) => (
          <VolunteersNeedsNow key={volunteer._id} volunteer={volunteer} />
        ))}

        {/* See All Button */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center mb-12 md:mb-24">
          <NavLink to="/allVolunteers">
            <button className="text-left font-semibold text-lg sm:text-xl text-lime-600 inline-block hover:text-blue-700 underline pb-3 transition-colors duration-300">
              See All ...
            </button>
          </NavLink>
        </div>
      </div>
      {/* Become A volunteer section */}
      <div>
        <BecomeAVolunteer />
      </div>
      {/* Impact Stories Section */}
      <div className='max-w-screen-lg mx-auto mb-24'>
        {/* Heading Section */}
        <div className="mt-4 px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 space-y-6 md:space-y-0">
            {/* Left Section (Heading and Subtitle) */}
            <div className="space-y-2 md:space-y-4">
              <p
                className={`text-sm md:text-base ${theme === "light" ? "text-gray-500" : "text-gray-300"
                  } uppercase font-semibold tracking-wide`}
              >
                Impact Stories
              </p>
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"
                  }`}
              >
                Today's Essential Reads
              </h1>
            </div>

            {/* Right Section (Button) */}
            <div>
              <NavLink to={"/allVolunteers"}>
                <button
                  className={`text-sm md:text-base font-semibold uppercase text-gray-900 border-b-2 ${theme === "light" ? "border-gray-900" : "border-gray-400"
                    } hover:text-gray-700 hover:border-gray-700`}
                >
                  Get Started Now
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        {/* Impact Stories */}
        <div>
          <ImpactStories />
        </div>
      </div>
    </div>

  )
}

export default Home