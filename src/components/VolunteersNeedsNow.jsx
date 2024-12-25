import moment from 'moment';
import React from 'react'
import { NavLink } from 'react-router-dom';
import UseContext from '../Context/CustomHook/UseContext';

const VolunteersNeedsNow = ({ volunteer }) => {
  const{theme} = UseContext()
  const { _id, thumbnail, title, category, date, volunteersNeeded } = volunteer || {}

  const formatDate = (isoString) => {
    return moment(isoString).format("MM/DD/YYYY"); // Example: "January 15, 2025"
  };
  const formattedDate = formatDate(date);


  return (
    <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${theme==='light'?"bg-white":"bg-gray-800"} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto`}>
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Post Title */}
        <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold ${theme==='light'?"text-black":"text-white"}`}>
          {title}
        </h3>

        {/* Category */}
        <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2">
          <span className="font-semibold">Category:</span> {category}
        </p>

        {/* Deadline */}
        <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
          <span className="font-semibold">Deadline:</span> {formattedDate}
        </p>

        {/* Volunteers Needed */}
        <div className="mt-4">
          <p className="text-xs sm:text-sm md:text-base text-gray-500">
            <span className="font-semibold">Volunteers Needed:</span>
            <span className="font-bold ml-2 text-rose-400">{volunteersNeeded}</span>
          </p>
        </div>

        {/* View Details Button */}
        <NavLink to={`/volunteerDetails/${_id}`}>
          <button
            className="mt-4 w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          >
            View Details
          </button>
        </NavLink>
      </div>
    </div>

  )
}

export default VolunteersNeedsNow