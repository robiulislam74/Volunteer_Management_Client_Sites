import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Router.jsx'
import MainLayOut from './MainLayOut/MainLayOut.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
    <AuthProvider>
      <RouterProvider router={router}>
        <MainLayOut />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
