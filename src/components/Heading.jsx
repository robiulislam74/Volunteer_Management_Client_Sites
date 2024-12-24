import React from 'react'

const Heading = ({ title, subTitle }) => {
  return (
    <div className="text-center mb-10 w-full max-w-3xl mx-auto space-y-4 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      <p className="text-gray-500 text-base sm:text-md">{subTitle}</p>
    </div>
  )
}

export default Heading