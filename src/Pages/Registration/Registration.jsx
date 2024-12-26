import Lottie from 'lottie-react'
import register_lotte from '../../assets/lotteFiles/registar_lotte.json'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import GoogleLogin from '../../SharedFiles/GoogleLogin'
import { updateProfile } from 'firebase/auth'
import auth from '../../FireBase/firebase.config'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async'

const Registration = () => {
    const { createSingUp, theme } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const locations = useLocation()
    const paths = locations.pathname.split("/")[1]
    const path = location.state || "/"
    const uppercaseRegex = /^(?=.*[A-Z]).+$/;
    const lowercaseRegex = /^(?=.*[a-z]).+$/;


    const handleRegistration = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const registerData = Object.fromEntries(data.entries())

        if (registerData.name == '' || registerData.email == '' || registerData.photoUrl == '' || registerData.password == '') {
            return toast.error("Please fulfill your from and Try Again !", {
                position: "top-center"
            });
        }
        else if (registerData.password.length < 6) {
            return toast.error("Password must be 6 character !", {
                position: "top-center"
            });
        }
        else if (!uppercaseRegex.test(registerData.password)) {
            return toast.error("Must have an 'Uppercase' letter in the password !", {
                position: "top-center"
            });
        }
        else if (!lowercaseRegex.test(registerData.password)) {
            return toast.error("Must have an 'LowerCase' letter in the password !", {
                position: "top-center"
            });
        }

        createSingUp(registerData.email, registerData.password)
            .then(credential => {
                updateProfile(auth.currentUser, {
                    displayName: registerData.fullname,
                    photoURL: registerData.photoUrl
                }).then(() => {
                    navigate(path)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Registration Successful!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }).catch((error) => {
                    // An error occurred
                    // ...
                });

                // console.log(credential.user)
            })
            .catch((error) => {
                // console.log(error.message)
            })

    }

    return (
        <div
            className={`min-h-screen flex flex-col md:flex-row items-center justify-center py-8 md:py-16 px-4 ${theme === "light" ? "bg-gray-50" : "bg-[#000000]"
                }`}
        >
            <Helmet>
                <title>Volunteer | {paths}</title>
            </Helmet>

            {/* Form Section */}
            <div
                className={`${theme === "light"
                        ? "bg-white"
                        : "bg-gray-900 border border-gray-800"
                    } flex-1 shadow-md rounded-lg p-6 md:p-8 w-full max-w-md`}
            >
                <h2
                    className={`text-2xl font-semibold ${theme === "light" ? "text-black" : "text-white"
                        } text-center mb-4`}
                >
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

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
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-blue-500 hover:underline focus:outline-none"
                    >
                        Login
                    </a>
                </p>
            </div>

            {/* Animation Section */}
            <div className="flex-1 w-full max-w-md md:max-w-lg lg:max-w-xl mt-8 md:mt-0 md:ml-8">
                <Lottie
                    className="w-full"
                    animationData={register_lotte}
                    loop={true}
                ></Lottie>
            </div>
        </div>

    )
}

export default Registration