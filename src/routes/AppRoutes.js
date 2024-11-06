import React, {useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UplodeServices from "../pages/UplodeServices";
import Home from "./Home";

import ContactUs from "../Component/Dashboard/ContactUs";

import UserDashbords from "../Component/UserDashbord/UserDashbords";
import UserNotification from "../Component/UserDashbord/UserNotification";
import Dashbord from "../pages/Dashbord";
import ServicesList from "../Component/UserDashbord/ServicesList";
import ServicesListDashboard from "../Component/Dashboard/ServicesList";
import AadharService from "../Component/Dashboard/AadharService";
import PanService from "../Component/Dashboard/PanService";
import UserDetails from "../Component/AdminDashboard/UserDetails";
import AllUserCertificates from "../Component/AdminDashboard/AllUserCertificates";
import UserInfo from "../Component/AdminDashboard/UserInfo";
import DepartmentPage from "../Component/SuperAdmin/DepartmentPage";
import AddCertificateForm from "../Component/SuperAdmin/AddCertificateForm";
import AddDepartmentForm from "../Component/SuperAdmin/AddDepartmentForm";
import RationCard from "../Component/Dashboard/RationCard";
import ElectionService from "../Component/Dashboard/ElectionCard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUserManagement from "../Component/SuperAdmin/AdminUserManagement";
import AssignedTaskPage from "../Component/AdminDashboard/AssignedTaskPage";
import Careers from "../Careers/Careers";
import ProfilePage from "../pages/profilePage";
import UserDashbord from "../pages/UserDashbord";
import { Usercontext } from '../Store/UserContext';
import SuperAdmin from "../pages/SuperAdmin";

const AppRoutes = () => {
  const { user, loading, error } = useContext(Usercontext);

  const token = localStorage.getItem("token");

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Determine user role from user object
  const userRole = user?.role?.toLowerCase();

  return (
    <Routes>
      {/* Redirect logic based on token */}
      {!token && <Route path="*" element={<Home />} />}
      {token && <Route path="/" element={<Navigate to="/dashbord" />} />}

      <Route path="careers" element={<Careers />} />

      {/* Main application routes */}
      <Route path="/dashbord" element={<Dashbord />}>
        <Route index element={<ServicesListDashboard />} />
       
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="aadhar" element={<AadharService />} />
        <Route path="pan" element={<PanService />} />
        <Route path="ration" element={<RationCard />} />
        <Route path="election" element={<ElectionService />} />
        <Route path="careers" element={<Careers />} />
      </Route>

      {token && userRole === "normal" && (
        <Route path="/userdashboard" element={<UserDashbord/>}>
          <Route index element={<UserDashbords />} />
          <Route path="service" element={<UplodeServices />} />
          <Route path="notifications" element={<UserNotification />} />
          <Route path="serviceslist" element={<ServicesList />} />
          
        </Route>
      )}
      {token && <Route path="profile" element={<ProfilePage />}  />}
      

      {/* User dashboard route */}
      {token && <Route path="service" element={<UplodeServices />} />}

      {/* AdminDashboard route */}
      {token && userRole === "admin" && (
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route index element={<UserDetails />} />
          <Route path="user/:userId" element={<UserInfo />} />
          <Route path="department" element={<DepartmentPage />} />
          <Route path="addCertificate" element={<AddCertificateForm />} />
          <Route path="addDepartment" element={<AddDepartmentForm />} />
          <Route path="allcertificates" element={<AllUserCertificates />} />
          <Route path="tasks" element={<AssignedTaskPage />} />
        </Route>
      )}

      {token && userRole === "superadmin" && (
        <Route path="/superAdmin" element={<SuperAdmin />}>
          <Route index element={<AdminUserManagement />} />
          <Route path="user/:userId" element={<UserInfo />} />
          <Route path="department" element={<DepartmentPage />} />
          <Route path="addCertificate" element={<AddCertificateForm />} />
          <Route path="addDepartment" element={<AddDepartmentForm />} />
        </Route>
      )}

      {/* Fallback route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
