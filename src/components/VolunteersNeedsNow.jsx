import moment from 'moment';
import React from 'react'
import { NavLink } from 'react-router-dom';
import UseContext from '../Context/CustomHook/UseContext';

const VolunteersNeedsNow = ({ volunteer }) => {
  const { theme,show } = UseContext()
  const { _id, thumbnail, title, category, date, volunteersNeeded } = volunteer || {}

  const formatDate = (isoString) => {
    return moment(isoString).format("MM/DD/YYYY"); // Example: "January 15, 2025"
  };
  const formattedDate = formatDate(date);


  return (
   <>
    {
      show
      ?
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
      :
      <div className="overflow-x-auto">
      <table className={`min-w-full table-auto border-collapse ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-md overflow-hidden`}>
        <thead>
          <tr className={`${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-gray-600`}>
            <th className="px-4 py-2 text-left text-xs sm:text-sm md:text-base font-semibold">Thumbnail</th>
            <th className="px-4 py-2 text-left text-xs sm:text-sm md:text-base font-semibold">Title</th>
            <th className="px-4 py-2 text-left text-xs sm:text-sm md:text-base font-semibold">Category</th>
            <th className="px-4 py-2 text-left text-xs sm:text-sm md:text-base font-semibold">Deadline</th>
            <th className="px-4 py-2 text-left text-xs sm:text-sm md:text-base font-semibold">Volunteers Needed</th>
            <th className="px-4 py-2 text-left text-xs sm:text-sm md:text-base font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-4 py-2">
              <img
                src={thumbnail}
                alt={title}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover rounded-md"
              />
            </td>
            <td className={`px-4 py-2 text-sm sm:text-base ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {title}
            </td>
            <td className="px-4 py-2 text-sm sm:text-base text-gray-500">{category}</td>
            <td className="px-4 py-2 text-sm sm:text-base text-gray-500">{formattedDate}</td>
            <td className="px-4 py-2 text-sm sm:text-base text-rose-400 font-bold">{volunteersNeeded}</td>
            <td className="px-4 py-2">
              <NavLink to={`/volunteerDetails/${_id}`}>
                <button
                  className="text-sm sm:text-base bg-blue-600 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  View Details
                </button>
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    }
   </>
  )
}

export default VolunteersNeedsNow