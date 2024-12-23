import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import VolunteerDetailsCard from '../../components/VolunteerDetailsCard'
import Heading from '../../components/Heading'

const VolunteerDetails = () => {
    const data = useLoaderData()
    const [volunteerArr,setVolunteerArr]=useState(data)

    console.log(volunteerArr)

  return (
    <div>
        <div className='mt-16'>
        <Heading
          title={'Volunteer Opportunity Details'}
          subTitle={"Explore all the essential information about this volunteer opportunity and find out how you can make a difference."}
        />
      </div>
        <div className='mb-24'>
        {
            volunteerArr.map(volunteer=>
                <VolunteerDetailsCard key={volunteer._id} volunteer={volunteer}/>
            )
        }
        </div>
    </div>
  )
}

export default VolunteerDetails