import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import Home from "../Pages/HomePage/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/LogIn/Login";
import AllVolunteerNeedPost from "../Pages/AllVolunteerNeedPost/AllVolunteerNeedPost";
import AddVolunteer from "../Pages/AddVolunteerNeedPost/AddVolunteer";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut/>,
      children:[
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: '/register',
          element: <Registration/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/allVolunteers',
          element: <AllVolunteerNeedPost/>,
          loader: ()=> fetch(`${import.meta.env.VITE_API_URL}/allVolunteers`)
        },
        {
          path: '/addVolunteer',
          element: <PrivateRoutes>
            <AddVolunteer/>
          </PrivateRoutes>
        },
      ]
    },
  ]);

  export default router