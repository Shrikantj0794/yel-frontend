import React, { useState } from "react";
import { FaUser, FaTimes, FaBriefcase, FaPhoneAlt, FaBars } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="absolute md:relative top-0 left-0 w-full p-1 text-gray-800 text-base flex flex-col md:flex-row justify-between items-center bg-white z-30 shadow-lg">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <img
            src="/images/YEL LOGO 2.png"
            alt="YEL Seva Logo"
            className="w-26 h-20 object-contain mr-4 ml-20"
          />
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="text-2xl md:hidden ml-4 z-40"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navbar Links */}
      <ul 
        className={`md:flex flex-col lg:flex-row md:space-y-0 lg:space-x-8 absolute md:static top-0 right-0 w-3/4 md:w-auto h-auto p-4 transition-transform duration-300 ease-in-out ${
          menuOpen ? "flex flex-col items-end mt-12 md:mt-0 bg-white" : "hidden"
        } z-30`}
      >
        <li>
          <Link to="/" className="hover:text-blue-900 flex items-center whitespace-nowrap p-4 rounded-md font-semibold">
            <span className="m-1"><IoMdHome /></span> Home
          </Link>
        </li>
        <li>
          <Link className="hover:text-blue-900 flex items-center whitespace-nowrap p-4 rounded-md font-semibold">
            <span className="m-1"><FaBriefcase /></span> SERVICES 
          </Link>
        </li>
        <li>
          <Link to="/careers" className="hover:text-blue-900 flex items-center whitespace-nowrap p-4 rounded-md font-semibold">
            <span className="m-1"><FaBriefcase /></span> CAREERS
          </Link>
        </li>
        <li>
          <Link to="/contactus" className="hover:text-blue-900 flex items-center whitespace-nowrap p-4 rounded-md font-semibold">
            <span className="m-1"><FaPhoneAlt /></span> CONTACT US
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;