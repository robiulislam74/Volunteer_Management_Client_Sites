import UseContext from "../Context/CustomHook/UseContext"


const Profile = () => {
    const {user} = UseContext()
      
  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1 mt-10 shadow-xl">
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
          <img
            className="w-full h-full object-cover"
            src={user?.photoURL || 'https://i.ibb.co/hC2kY9v/profile.png'}
            alt="Profile"
          />
        </div>
        <h2 className="text-3xl font-extrabold mt-4 text-gray-800 dark:text-white text-center">User Profile</h2>
      </div>

      <div className="space-y-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Name</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{user?.displayName || 'robiul islam'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{user?.email || 'robiulislam984453@gmail.com'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Role</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{user?.role || 'Volunteer'}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Profile