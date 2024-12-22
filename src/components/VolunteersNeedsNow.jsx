import moment from 'moment';
import React from 'react'

const VolunteersNeedsNow = ({volunteer}) => {
    const {thumbnail, title, category, date} = volunteer || {}

    const formatDate = (isoString) => {
        return moment(isoString).format("MM/DD/YYYY"); // Example: "January 15, 2025"
      };
      const formattedDate = formatDate(date);


  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    {/* Thumbnail */}
    <img
      src={thumbnail}
      alt={title}
      className="w-full h-48 object-cover"
    />

    {/* Card Content */}
    <div className="p-4">
      {/* Post Title */}
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>

      {/* Category */}
      <p className="text-sm text-gray-500 mt-2">
        <span className="font-semibold">Category:</span> {category}
      </p>

      {/* Deadline */}
      <p className="text-sm text-gray-500 mt-1">
        <span className="font-semibold">Deadline:</span> {formattedDate}
      </p>

      {/* View Details Button */}
      <button
        className="mt-4 w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        View Details
      </button>
    </div>
  </div>
  )
}

export default VolunteersNeedsNow