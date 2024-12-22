import React from 'react'
import UseContext from '../Context/CustomHook/UseContext'
import { Navigate, useLocation } from 'react-router-dom'
import { DNA } from 'react-loader-spinner'


const PrivateRoutes = ({ children }) => {
    const { user, loading, setLoading } = UseContext()
    const location = useLocation()

    if (loading) {
        return <div className='min-h-[calc(100vh-308px)] flex justify-center items-center'>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    }

    if (user) {
        setLoading(false)
        return children
    }

    return (
        <>
            <Navigate to={'/login'} state={location.pathname}></Navigate>
        </>
    )
}

export default PrivateRoutes