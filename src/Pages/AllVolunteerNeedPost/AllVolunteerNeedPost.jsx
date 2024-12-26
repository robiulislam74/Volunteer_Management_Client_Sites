import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import VolunteersNeedsNow from '../../components/VolunteersNeedsNow'
import Heading from '../../components/Heading'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { BsGrid3X3GapFill } from "react-icons/bs";
import { PiListBold } from "react-icons/pi";
import UseContext from '../../Context/CustomHook/UseContext'

const AllVolunteerNeedPost = () => {
  const { handleLayoutControl, show } = UseContext()
  const [allVolunteers, setAllVolunteers] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const locations = useLocation()
  const path = locations.pathname.split("/")[1]


  useEffect(() => {
    const volunteersFunc = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/allVolunteers?title=${searchTitle}`)
      setAllVolunteers(data)
    }
    volunteersFunc()
  }, [searchTitle])


  return (
    <div className='md:px-6 lg:px-0'>
      <Helmet>
        <title>Volunteer | {path}</title>
      </Helmet>
      <div className="mt-16">
        <Heading
          title={'All Volunteer Opportunities'}
          subTitle={"Discover a wide range of volunteer opportunities across various causes and organizations. This is the place to find meaningful ways to contribute and make an impact"}
        />
      </div>
      <div className="w-11/12 md:w-6/12 lg:w-5/12 mx-auto mb-10 flex gap-2 items-center">
        <label className="input w-full input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="btn btn-outline btn-accent">Search</button>
        {/* Layout change */}
        <div onClick={handleLayoutControl} className='ml-6 flex gap-3 text-gray-700 border px-3 py-2'>
          <span className='font-medium'>Layout: </span>
          {
            show
              ?
              <PiListBold className='text-2xl' />
              :
              <BsGrid3X3GapFill className='text-2xl' />
          }
        </div>
      </div>
      {
        show
          ?
          <div className="max-w-screen-lg mb-24 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {allVolunteers.map(volunteer => (
              <VolunteersNeedsNow key={volunteer._id} volunteer={volunteer} />
            ))}
          </div>
          :
       <div className="max-w-screen-lg mb-24 mx-auto flex flex-col gap-6">
            {allVolunteers.map(volunteer => (
              <VolunteersNeedsNow key={volunteer._id} volunteer={volunteer} />
            ))}
          </div>
      }
      
    </div >

  )
}

export default AllVolunteerNeedPost