import Lottie from 'lottie-react'
import register_lotte from '../../assets/lotteFiles/registar_lotte.json'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from '../../SharedFiles/GoogleLogin'
import { updateProfile } from 'firebase/auth'
import auth from '../../FireBase/firebase.config'

const Registration = () => {
    const { createSingUp } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleRegistration = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const registerData = Object.fromEntries(data.entries())

        createSingUp(registerData.email, registerData.password)
            .then(credential => {
                updateProfile(auth.currentUser, {
                    displayName: registerData.fullname, 
                    photoURL: registerData.photoUrl
                  }).then(() => {
                    // Profile updated!
                    // ...
                    navigate('/')
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
                
                console.log(credential.user)
            })
            .catch((error) => {
                console.log(error.message)
            })

    }

    return (
        <div className="min-h-screen flex items-center justify-center py-16 bg-gray-50">
            <div className="bg-white flex-1 shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                    Create an Account
                </h2>
                <form onSubmit={handleRegistration}>
                    {/* Photo URL */}
                    <div className="mb-4">
                        <label
                            htmlFor="photoUrl"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Photo URL
                        </label>
                        <input
                            type="url"
                            id="photoUrl"
                            name="photoUrl"
                            placeholder="Enter a photo URL"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="fullname"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="Enter your full name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {/* Confirm Password */}
                    {/* <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div> */}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Register
                    </button>
                </form>

                {/* Link to Login */}
                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-blue-500 hover:underline focus:outline-none"
                    >
                        Log in
                    </a>
                </p>
                <div>
                    <GoogleLogin/>
                </div>
            </div>
            <div>
                <Lottie className='flex-1 w-[500px]' animationData={register_lotte} loop={true}>
                </Lottie>
            </div>

        </div>
    )
}

export default Registration