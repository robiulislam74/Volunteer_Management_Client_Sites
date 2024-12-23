import moment from 'moment';
import React from 'react'
import { NavLink } from 'react-router-dom';

const VolunteersNeedsNow = ({ volunteer }) => {
  const { _id, thumbnail, title, category, date,volunteersNeeded } = volunteer || {}

  const formatDate = (isoString) => {
    return moment(isoString).format("MM/DD/YYYY"); // Example: "January 15, 2025"
  };
  const formattedDate = formatDate(date);


  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto">
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Post Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          {title}
        </h3>

        {/* Category */}
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          <span className="font-semibold">Category:</span> {category}
        </p>

        {/* Deadline */}
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          <span className="font-semibold">Deadline:</span> {formattedDate}
        </p>

        {/* Volunteers Needed */}
        <div className="mt-6">
          <p className="text-sm sm:text-base text-gray-500">
            <span className="font-semibold">Volunteers Needed:</span> 
            <span className='font-bold ml-2 text-rose-400'>{volunteersNeeded}</span>
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