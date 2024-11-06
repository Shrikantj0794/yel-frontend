import React from "react";
import ServicesAvailable from "../Component/Services/ServicesAvailable";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import servicesSide from "../Assets/servicesSide.jpg";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-gray-100 overflow-x-hidden">
      {/* Fixed Navbar */}
      <div className="fixed w-full z-10">
        <Navbar />
      </div>

      {/* Main Content Wrapper with top margin and padding */}
      <div className="flex-grow flex flex-col px-4 sm:px-6 py-8 sm:py-10 lg:py-0 lg:w-full sm:ml-0 lg:ml-16 mb-6 sm:mb-10 mt-[4.5rem] sm:mt-[5rem] lg:mt-[6rem]">
        {/* Content in Row on Large Screens */}
        <div className="flex flex-col-reverse lg:flex-row w-full items-center">
          {/* Image and ServicesAvailable with large shadow */}
          <div
            className="flex flex-col lg:w-[60%] mt-10 sm:mt-16 lg:mt-20 lg:flex-row w-full rounded-2xl bg-white"
            style={{
              boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Image */}
            <div className="flex-shrink-0 w-full lg:w-[40%]">
              <img
                className="w-full object-fill rounded-lg lg:h-full"
                src={servicesSide}
                alt="Services Side"
              />
            </div>
            {/* ServicesAvailable Component */}
            <div className="flex justify-center items-center w-full lg:w-[60%]">
              <ServicesAvailable />
            </div>
          </div>

          {/* Login/Signup in Same Row on Large Screens */}
          <div className="w-full flex lg:w-[40%] justify-center items-center mt-4 lg:mt-12">
            <div className="w-full max-w-md">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
