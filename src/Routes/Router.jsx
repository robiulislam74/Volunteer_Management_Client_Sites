import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import Home from "../Pages/HomePage/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/LogIn/Login";
import AllVolunteerNeedPost from "../Pages/AllVolunteerNeedPost/AllVolunteerNeedPost";

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
          path: '/allVolunteer',
          element: <AllVolunteerNeedPost/>
        },
      ]
    },
  ]);

  export default router