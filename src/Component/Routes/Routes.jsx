import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Router from "./Router";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import TaskFormAndTable from "../Pages/TaskFormAndTable/TaskFormAndTable";
import Deshbroad from "../Deshbroad/Deshbroad";
import Progress from "../HR/Progress/Progress";
import Statistic from "../Deshbroad/Statistic/Statistic";
import ContactUs from "../ContactUs/ContactUs";
import PaymentHistory from "../Deshbroad/Employee/PaymentHistory/PaymentHistory";
import EmployeeList from "../HR/EmployeeList/EmployeeList";

import AdminPage from "../Deshbroad/Admin/AdminPage";
import ContactSee from "../ContactUs/ContactSee";
import Profile from "../Profile/Profile";
import PrivateRoute from "../Pages/Authentication/PrivateRoute";
import EmployeeDetails from "../HR/EmployeeList/EmployeeDetails";
import AdminRoute from "../Deshbroad/Admin/AdminRoute";
import HostRoute from "../HR/HostRoute";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Router></Router>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path: "/",
            element: <HomePage></HomePage>,

        },
        {
          path:'/contactUs',
          element:<ContactUs></ContactUs>
        },
        {
          path:'/googleuser/:id',
          element:<PrivateRoute><EmployeeDetails></EmployeeDetails></PrivateRoute>
        },
        {
          path:'/signUpUser/:id',
          element:<PrivateRoute><EmployeeDetails></EmployeeDetails></PrivateRoute>
        },
      
      ]
    },

    {
      path:"/login",
      element:<Login></Login>
    },

    {
      path:"/signup",
      element:<SignUp></SignUp>
    },


    // deshbroad
    {
      path:"/deshbroad",
      element:<PrivateRoute><Deshbroad></Deshbroad></PrivateRoute>,
      children:[
        {
          path:'/deshbroad',
          element:<PrivateRoute><Statistic></Statistic></PrivateRoute>
        },


        // Employee 
        {
          path:"taskForm",
          element:<PrivateRoute><TaskFormAndTable></TaskFormAndTable></PrivateRoute> //worksheet

        },
        {
          path:'paymentHistory',
          element:<PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
        },

          // HR 
        {
          path:'employeeList',
          element:<PrivateRoute><HostRoute><EmployeeList></EmployeeList></HostRoute></PrivateRoute>
        },
        
        {
          path:'progress',
          element:<PrivateRoute><HostRoute><Progress></Progress></HostRoute></PrivateRoute>
        },
        

        // Admin 
        {
          path:'admin',
          element:<PrivateRoute><AdminRoute><AdminPage></AdminPage></AdminRoute></PrivateRoute>
        },
        {
          path:'allFeedBack',
          element:<PrivateRoute><AdminRoute><ContactSee></ContactSee></AdminRoute></PrivateRoute>
        },




        {
          path:'profile',
          element:<PrivateRoute><Profile></Profile></PrivateRoute>
        },
        
       
      ]
    }
   
    
  ]);