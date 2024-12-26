import Lottie from 'lottie-react'
import singIn_Lotte from '../../assets/lotteFiles/signIn_lotte.json'
import UseContext from '../../Context/CustomHook/UseContext'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import GoogleLogin from '../../SharedFiles/GoogleLogin'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async'

const Login = () => {
  const { signInUser, theme } = UseContext()
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.state || "/"
  const locations = useLocation()
  const paths = locations.pathname.split("/")[1]

  const handleSignIn = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const registerData = Object.fromEntries(data.entries())

    signInUser(registerData.email, registerData.password)
      .then(credential => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 2000
        });
        navigate(path)
        // console.log(credential.user)
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again later.", {
          position: 'top-center',
        });
      })
  }

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-16 ${theme === "light" ? "bg-gray-50" : "bg-[#000000]"
        }`}
    >
      <Helmet>
        <title>Volunteer | {paths}</title>
      </Helmet>

      {/* Login Form */}
      <div
        className={`${theme === "light"
            ? "bg-white"
            : "bg-gray-900 border border-gray-800"
          } shadow-md rounded-lg p-6 md:mt-0 mt-6 md:p-8 w-full max-w-md`}
      >
        <h2
          className={`text-2xl font-semibold ${theme === "light" ? "text-black" : "text-white"
            } text-center mb-4`}
        >
          Login to Your Account
        </h2>
        <form onSubmit={handleSignIn}>
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

          {/* Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Register Now
          </a>
        </p>

        {/* Google Login */}
        <div className="mt-4">
          <GoogleLogin></GoogleLogin>
        </div>
      </div>

      {/* Lottie Animation */}
      <div className="flex-1 w-full max-w-sm md:max-w-md lg:max-w-lg mt-8 md:mt-0 md:ml-8">
        <Lottie
          className="w-full"
          animationData={singIn_Lotte}
          loop={true}
        ></Lottie>
      </div>
    </div>

  )
}

export default Login