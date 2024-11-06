import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../Component/Navbar/UserNavbar";
import UserSidebar from "../Component/UserDashbord/UserSidebar";


const UserDashbord = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-10">
          <UserNavbar />
        </div>

        {/* Sidebar and Content Area */}
        <div className="flex flex-1 mt-16"> {/* Push content down under the navbar */}
          {/* Fixed Sidebar */}
          <div className="top-14 left-0  h-[calc(100vh-64px)] "> {/* 64px height reserved for the navbar */}
            <UserSidebar/>
          </div>

          {/* Main Content */}
          <div className=" ml-14 p-10 w-full overflow-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
            <Outlet/>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="fixed">
        <Footer />
        </div> */}
         
        
      </div>
    </>
  );
};

export default UserDashbord;
