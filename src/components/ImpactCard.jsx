import React from 'react'
import UseContext from '../Context/CustomHook/UseContext'

const ImpactCard = ({image,category,content,raised,goal,progress,description}) => {
     const {theme} = UseContext()


  return (
    <div
    className={`max-w-sm sm:max-w-md lg:max-w-lg mx-auto ${
      theme === "light" ? "bg-white" : "bg-gray-800"
    } shadow-lg rounded-lg overflow-hidden`}
  >
    {/* Image Section */}
    <div className="relative">
      <img
        src={image} // Replace with your actual image URL
        alt="Charity"
        className="w-full h-48 sm:h-64 object-cover"
      />
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded">
        {category}
      </span>
    </div>
  
    {/* Content Section */}
    <div className="p-4">
      {/* Title */}
      <h3
        className={`text-lg sm:text-xl font-semibold ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        {content}
      </h3>
  
      {/* Progress Info */}
      <div
        className={`flex items-center justify-between mt-2 text-sm ${
          theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}
      >
        <p>
          Raised: <span className="font-bold">$ {raised}</span>
        </p>
        <p>
          Goal: <span className="font-bold">$ {goal}</span>
        </p>
      </div>
  
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div
          className="bg-yellow-500 h-1.5 rounded-full"
          style={{ width: `${progress}` }} // Dynamic width
        ></div>
      </div>
  
      {/* Description */}
      <p
        className={`mt-4 text-sm ${
          theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}
      >
        {description}...
      </p>
    </div>
  </div>
  
  )
}

export default ImpactCard