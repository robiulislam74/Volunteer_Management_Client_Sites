import React from 'react'
import { Link } from 'react-router-dom'
import UseContext from '../Context/CustomHook/UseContext'
import { MdUpdateDisabled } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { TfiMore } from 'react-icons/tfi'

const Sidebar = () => {
  const { user } = UseContext()

  return (
    <div className="w-64 min-h-full bg-green-100 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="space-y-4 text-lg font-medium">
        <div className='flex items-center gap-x-3'>
        <div tabIndex={0} role="button" className="btn w-10 md:w-[40px] btn-ghost btn-circle avatar">
          <div data-tooltip-id="my-tooltip-2" className="rounded-full border-2 border-green-500">
            <img
              className='inline-block'
              src={user?.photoURL}
              alt="Navbar-profile-photo" />
          </div>
        </div>
        <Link to="/profile" className="block hover:text-green-400 duration-150">{user?.displayName}</Link>
        </div>
         <div className="items-center flex gap-x-3">
         <FaEdit className='text-2xl'/>
         <Link to="/update-profile" className="block hover:text-green-400 duration-150"> 
         Update Profile</Link>
         </div>
         <div className='flex items-center gap-x-3'>
         <TfiMore className='text-2xl'/>
         <Link to="/other" className="block hover:text-green-400 duration-150">Other</Link>
         </div>
      </nav>
    </div>
  )
}

export default Sidebar