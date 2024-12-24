import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <Helmet>
        <title>Volunteer | errorPage</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
      <p className="mt-2 text-lg text-gray-700">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        <i>{error.statusText || error.message}</i>
      </p>

      <a href='/'
        className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
      >
        Go Back Home
      </a>
    </div>

  )
}

export default ErrorPage