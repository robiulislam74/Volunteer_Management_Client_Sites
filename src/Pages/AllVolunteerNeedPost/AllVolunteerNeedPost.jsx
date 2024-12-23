import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import VolunteersNeedsNow from '../../components/VolunteersNeedsNow'
import Heading from '../../components/Heading'

const AllVolunteerNeedPost = () => {
  const volunteers = useLoaderData()
  const [allVolunteers, setAllVolunteers] = useState(volunteers)


  return (
    <div>
      <div className='mt-16'>
        <Heading
          title={'All Volunteer Opportunities'}
          subTitle={"Discover a wide range of volunteer opportunities across various causes and organizations. This is the place to find meaningful ways to contribute and make an impact"}
        />
      </div>
      <div className='max-w-screen-lg mb-24 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {allVolunteers.map(volunteer => <VolunteersNeedsNow key={volunteer._id} volunteer={volunteer} />)}
      </div>
    </div>
  )
}

export default AllVolunteerNeedPost