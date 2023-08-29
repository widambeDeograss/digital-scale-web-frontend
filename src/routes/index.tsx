import React, {useState, useEffect} from 'react';
import LoginPage from '../pages/auth/LoginPage';
import Main from '../layouts/Admin/Main';
import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom';
import AdminHome from '../pages/Dashboard/AdminHome';
import PageNotFound from '../components/PageNotFound';
import CorporateAdminHome from '../pages/Dashboard/CorporateAdminHome';
import RequireAuth from '../app/RequireAuth';
import { selectCurrentToken } from '../app/AuthSlice';
import { selectCurrentUser } from '../app/AuthSlice';
import { useSelector } from 'react-redux';
import Farmers from '../pages/farmers/Farmers';
import AddFarmers from '../pages/farmers/AddFarmers';
import { RegistrationPage } from '../pages/auth/RegistrationPage';
import CropsList from '../pages/Crops/CropsList';
import AddCrops from '../pages/Crops/AddCrops';
import CorporateCrops from '../pages/Crops/CorporateCrops';
import Societies from '../pages/CorporateSociety/Societies';
import AddSociety from '../pages/CorporateSociety/AddSociety';
import CorporateDsc from '../pages/CorporateSociety/CorporateDsc';
import FarmerDashboard from '../pages/Dashboard/FarmerDashboard';


type userType = {
  id:String
  role:String
   
}

const AppRouter = () => {
  const token = useSelector(selectCurrentToken);
 
 
  <Router></Router>;
    const routes = useRoutes([
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/farmers_dashboard",
        element:  token
        ?<FarmerDashboard />
        : <Navigate to="/login"  />,
      },
      {
        path: "/*",
        element:  token
        ? <Main/>
        : <Navigate to="/login"  />,
        children: [
          { element: <Navigate to="/dashboard" />, index: true },
          { path: "dashboard", element:  <AdminHome/> },
          { path: "farmers", element:  <Farmers/> },
          { path: "addfarmer_to_society", element:  <AddFarmers/> },
          { path: "cropsList", element:  <CropsList/> },
          { path: "AddCrops", element:  <AddCrops/> },
          { path: "corporateCrops", element:  <CorporateCrops/> },
          { path: "all_corporates", element:  <Societies/> },
          { path: "addCorporates", element:  <AddSociety/> },
          { path: "corporate_descript", element:  <CorporateDsc/> },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/404",
        element: <PageNotFound />,
      }
    ]);
  
    return routes;
}

export default AppRouter