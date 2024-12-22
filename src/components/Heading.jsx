import React from 'react'

const Heading = ({title,subTitle}) => {
  return (
    <div className='text-center mt-24 mb-12 w-8/12 mx-auto space-y-4'>
        <h2 className='text-4xl font-bold'>{title}</h2>
        <p className='text-gray-500 text-md'>{subTitle}</p>
    </div>
  )
}

export default Heading