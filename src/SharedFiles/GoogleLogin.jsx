import { div } from 'motion/react-client';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import UseContext from '../Context/CustomHook/UseContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GoogleLogin = () => {
    const {handleGoogleLogin}=UseContext()
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.state || "/"

    const handleGoogleBtn =()=>{
        handleGoogleLogin()
        .then(result=>{
            navigate(path)
             Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Login Successful!",
                      showConfirmButton: false,
                      timer: 2000
                    });
            console.log("Google Login Successful:",result.user)
        }).catch((error)=>{
            console.log("Error:",error.message)
        })
    }
  return (
    <>
    <div className='divider'>Or</div>
    <div className='flex gap-3 items-center justify-center'>
        <p className='text-lg text-gray-500'>Login with Via</p>
        <button onClick={handleGoogleBtn} className='btn btn-outline px-8 btn-success'>
            <FcGoogle className='text-3xl'/>
        </button>
    </div>
    </>
  )
}

export default GoogleLogin