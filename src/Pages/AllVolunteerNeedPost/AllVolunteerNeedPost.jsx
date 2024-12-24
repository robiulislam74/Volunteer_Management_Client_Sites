import React, { useEffect, useState } from 'react'
import {useLocation } from 'react-router-dom'
import VolunteersNeedsNow from '../../components/VolunteersNeedsNow'
import Heading from '../../components/Heading'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

const AllVolunteerNeedPost = () => {
  // const volunteers = useLoaderData()
  const [allVolunteers, setAllVolunteers] = useState([])
  const [searchTitle,setSearchTitle] =useState('')
  const locations = useLocation()
  const path = locations.pathname.split("/")[1]


  useEffect(()=>{
    const volunteersFunc = async()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/allVolunteers?title=${searchTitle}`)
      setAllVolunteers(data)
    }
    volunteersFunc()
  },[searchTitle])

  // const handleSearch =async () =>{
  //   const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/allVolunteers?title=${searchTitle}`)
  //   .then(res=>setAllVolunteers(res.data))
  // }


  return (
    <div>
      <Helmet>
                  <title>Volunteer | {path}</title>
              </Helmet>
      <div className='mt-16'>
        <Heading
          title={'All Volunteer Opportunities'}
          subTitle={"Discover a wide range of volunteer opportunities across various causes and organizations. This is the place to find meaningful ways to contribute and make an impact"}
        />
      </div>
      <div className='w-4/12 mx-auto mb-10 flex gap-2'>
        <label className="input w-full input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" onChange={(e)=>setSearchTitle(e.target.value)} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <button className='btn btn-outline btn-accent'>Search</button>
      </div>
      <div className='max-w-screen-lg mb-24 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {allVolunteers.map(volunteer => <VolunteersNeedsNow key={volunteer._id} volunteer={volunteer} />)}
      </div>
    </div>
  )
}

export default AllVolunteerNeedPost