import React from 'react'

const VolunteerDetailsCard = ({ volunteer }) => {
    return (
        <div className="max-w-4xl bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto p-6">
            {/* Thumbnail */}
            <img
                src={volunteer.thumbnail}
                alt={volunteer.title}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover rounded-lg"
            />

            {/* Card Content */}
            <div className="mt-6">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {volunteer.title}
                </h2>

                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-600 mt-4">
                    {volunteer.description}
                </p>

                {/* Category, Location and Date */}
                <div className="mt-4">
                    <p className="text-sm sm:text-base text-gray-500">
                        <span className="font-semibold">Category:</span> {volunteer.category}
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        <span className="font-semibold">Location:</span> {volunteer.location}
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        <span className="font-semibold">Deadline:</span> {new Date(volunteer.date).toLocaleDateString()}
                    </p>
                </div>

                {/* Organizer Information */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Organizer Information</h3>
                    <p className="text-sm sm:text-base text-gray-500 mt-2">
                        <span className="font-semibold">Organizer:</span> {volunteer.organizer_name}
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        <span className="font-semibold">Email:</span> {volunteer.organizer_email}
                    </p>
                </div>

                {/* Volunteers Needed */}
                <div className="mt-6">
                    <p className="text-sm sm:text-base text-gray-500">
                        <span className="font-semibold">Volunteers Needed:</span> {volunteer.volunteersNeeded}
                    </p>
                </div>

                {/* Apply Button */}
                <div className="mt-6">
                    <button
                        className="w-full sm:w-auto text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Be a Volunteer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VolunteerDetailsCard