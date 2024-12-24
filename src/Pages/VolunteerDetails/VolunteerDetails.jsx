import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import VolunteerDetailsCard from '../../components/VolunteerDetailsCard'
import Heading from '../../components/Heading'

const VolunteerDetails = () => {
  const data = useLoaderData()
  const [volunteerArr, setVolunteerArr] = useState(data)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-12 sm:mt-16 text-center">
        <Heading
          title="Volunteer Opportunity Details"
          subTitle="Explore all the essential information about this volunteer opportunity and find out how you can make a difference."
        />
      </div>

      <div className="mt-8 sm:mt-12 mb-16 sm:mb-24">
        {volunteerArr.map((volunteer) => (
          <div key={volunteer._id} className="mb-6 sm:mb-8">
            <VolunteerDetailsCard volunteer={volunteer} />
          </div>
        ))}
      </div>
    </div>

  )
}

export default VolunteerDetails