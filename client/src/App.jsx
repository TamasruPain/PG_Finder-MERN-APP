import HomePage from "./components/Home/HomePage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './components/cards.css'

import UserDash from "./components/PropertyHolder/UserDash"
import AdminDash from "./components/Admin/AdminDash"
import PropertyPage from "./components/Property/PropertyPage"
import ViewPropertyDetails from "./components/Property/ViewPropertyDetails"
import UserPropertyList from "./components/PropertyHolder/UserPropertyList"
import UserProfile from "./components/PropertyHolder/UserProfile"

import PropAddForm from "./components/PropertyHolder/PropAddForm"
import PropUpdateForm from "./components/PropertyHolder/PropUpdateForm"
import PropViewForm from "./components/PropertyHolder/PropViewForm"
import CustomerQueries from "./components/PropertyHolder/CustomerQueries"
import CustomerViewQuery from "./components/PropertyHolder/CustomerViewQuery"
import UserSignup from "./components/loginAndSignup/UserSignup.jsx"
import UserLogin from "./components/loginAndSignup/UserLogin.jsx"

import ListOfUsers from "./components/Admin/ListOfUsers"
import ListOfProperties from "./components/Admin/ListOfProperties"
import AdminProfile from "./components/Admin/AdminProfile"
import AdminLogin from "./components/loginAndSignup/AdminLogin.jsx"
import AdminSignup from "./components/loginAndSignup/AdminSignup.jsx"

import ContactUs from "./components/ContactUs.jsx"

import { useState } from "react"
import { RefreshHandler, AdminRefreshHandler } from './utils.jsx'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/userLogin' />
  }

  const AdminPrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/adminLogin' />
  }

  return (
    <>
      <BrowserRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <AdminRefreshHandler setIsAuthenticated={setIsAuthenticated} />
        {/* element={<PrivateRoute    />} */}

        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/viewdetails/:id" element={<ViewPropertyDetails />} />
          <Route path='/contactUs' element={<ContactUs />} />

          <Route path="/userDashboard" element={<PrivateRoute element={<UserDash />} />} />

          <Route path="/userprofile" element={<PrivateRoute element={<UserProfile />} />} />
          <Route path='/userpropertylist' element={<PrivateRoute element={<UserPropertyList />} />} />
          <Route path='/addProperty' element={<PrivateRoute element={<PropAddForm />} />} />
          <Route path='/viewProperty/:id' element={<PrivateRoute element={<PropViewForm />} />} />
          <Route path='/updateProperty/:id' element={<PrivateRoute element={<PropUpdateForm />} />} />

          <Route path="/customerqueries" element={<PrivateRoute element={<CustomerQueries />} />} />
          <Route path='/viewquery/:id' element={<PrivateRoute element={<CustomerViewQuery />} />} />

          <Route path="/adminDashboard" element={<AdminPrivateRoute element={<AdminDash />} />} />
          <Route path="/adminprofile" element={<AdminPrivateRoute element={<AdminProfile />} />} />
          <Route path="/listofusers" element={<AdminPrivateRoute element={<ListOfUsers />} />} />
          <Route path="/listofproperties" element={<AdminPrivateRoute element={<ListOfProperties />} />} />

          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userSignup" element={<UserSignup />} />

          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminSignup" element={<AdminSignup />} />

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
