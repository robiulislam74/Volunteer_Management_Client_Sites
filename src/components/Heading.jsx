import React from 'react'

const Heading = ({title,subTitle}) => {
  return (
    <div className='text-center mb-12 w-3/6 mx-auto space-y-4'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <p className='text-gray-500 text-md'>{subTitle}</p>
    </div>
  )
}

export default Heading