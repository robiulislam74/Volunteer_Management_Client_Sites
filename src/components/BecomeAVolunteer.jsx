import React from 'react'
import { NavLink } from 'react-router-dom'

const BecomeAVolunteer = () => {
  return (
    <div className="h-96 md:h-[500px] w-full bg-bgImg bg-no-repeat bg-cover bg-center mb-24">
      <div className="w-full h-full bg-black/70 hover:bg-black/80 transition duration-500 flex flex-col justify-center items-center px-4 text-center space-y-6">
        <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold">
          Are you ready to volunteer?
        </h2>
        <p className="text-white text-base sm:text-lg md:text-2xl font-medium">
          Start one of our programs today and help people in need
        </p>
        <div className="divider bg-white h-1 w-20 md:w-28 mx-auto"></div>
        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <NavLink to={"/allVolunteers"}>
            <button className="px-3 py-2 sm:px-5 sm:py-3 text-white font-semibold border-4 border-[#BD2C1E] hover:bg-[#BD2C1E] transition duration-300">
              BECOME A VOLUNTEER
            </button>
          </NavLink>
          <button className="px-3 py-2 sm:px-5 sm:py-3 text-white font-semibold border-4 border-[#BD2C1E] hover:bg-[#BD2C1E] transition duration-300">
            MAKE A DONATION
          </button>
        </div>
      </div>
    </div>

  )
}

export default BecomeAVolunteer