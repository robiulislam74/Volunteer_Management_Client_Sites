import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/images/volunteer-1.png'
import UseContext from '../Context/CustomHook/UseContext'
import { Tooltip as ReactTooltip } from "react-tooltip";

const Navbar = () => {
  const { user, signOutFunc, handleToggleBtn } = UseContext()

  const handleLogOut = () => {
    signOutFunc()
      .then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
  }

  const links = <div className='md:flex navItem items-center text-base font-medium text-gray-600 md:space-x-6'>
    <NavLink to={"/"}><li className='hover:text-blue-700 hover:font-medium'>Home</li></NavLink>
    <NavLink to={"/allVolunteers"}><li className='hover:text-blue-700 hover:font-medium'>All volunteer Need posts</li></NavLink>
    <NavLink to={'/addVolunteer'}>
                      <li className='hover:text-blue-700 hover:font-medium'>
                        Add Volunteer need Post
                      </li>
                    </NavLink>
                    <NavLink to={'/manageMyPost'}>
                      <li className='hover:text-blue-700 hover:font-medium'>
                        Manage My Posts
                      </li>
                    </NavLink>
    {/* toggle button */}
    <label onClick={handleToggleBtn} className="flex cursor-pointer gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input type="checkbox" value="synthwave" className="toggle theme-controller" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  </div>

  return (
    <div className="navbar max-w-screen-xl mx-auto md:py-5 py-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <NavLink to={'/'}>
          <div className="flex items-center gap-x-3">
            <img className='md:w-14 w-10' src={logo} />
            <div className='hidden md:block'>
              <h2 className='text-3xl font-bold font-cabin'>Volunteer</h2>
              <p className='text-sm font-semibold'>Charity & Fundraising</p>
            </div>
          </div>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end space-x-3 flex items-center">
        {/* Profiles */}
        <ReactTooltip
          id="my-tooltip-2"
          place="left"
          variant="info"
          content={user?.displayName}
        />
        <div>
          {
            user
              ?
              <div className='flex items-center gap-3'>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn w-10 md:w-[50px] btn-ghost btn-circle avatar">
                    <div data-tooltip-id="my-tooltip-2" className="rounded-full border-2 border-green-500">
                      <img
                        className='inline-block'
                        src={user.photoURL}
                        alt="Navbar-profile-photo" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu p-4 space-y-3 menu-sm drop text-left font-medium text-gray-700 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 shadow">
                    <NavLink to={'/addVolunteer'}>
                      <li className='hover:text-blue-700 hover:font-medium'>
                        Add Volunteer need Post
                      </li>
                    </NavLink>
                    <NavLink to={'/manageMyPost'}>
                      <li className='hover:text-blue-700 hover:font-medium'>
                        Manage My Posts
                      </li>
                    </NavLink>
                  </ul>
                </div>
                <div>
                  <NavLink to={'/'}>
                    <button onClick={handleLogOut} className="btn btn-sm md:btn-md btn-error btn-outline">LogOut</button>
                  </NavLink>
                </div>
              </div>
              :
              <div className='flex gap-4'>
                <NavLink to={'/login'}>
                  <button className="btn btn-primary btn-outline text-base">Login</button>
                </NavLink>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar