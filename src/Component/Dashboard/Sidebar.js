import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
    setIsSidebarOpen(false);
  };

  const toggleMenu = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative mt-3 pt-3">
      <div className="md:hidden pt-4" onClick={toggleMenu}>
        <FaBars className="text-xl cursor-pointer" />
      </div>

      <div
        className={`fixed md:relative w-64 h-screen bg-[#075985] text-white top-0 left-0 overflow-y-auto transition-transform duration-300 ease-in-out z-50  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isSidebarOpen ? 'mt-16' : 'mt-0'}`} 
      >
        {/* ${isSidebarOpen ? 'mt-16' : ''} md:mt-0`} */}
        <ul className="space-y-2 py-4 mt-2" >
          <li
            className={`px-4 py-2 text-left ${
              activeLink === 0 ? "bg-sky-900" : "hover:bg-sky-900"
            }`}
            onClick={() => handleLinkClick(0)}
          >
            <Link className="block">Home</Link>
          </li>
          <li
            className={`px-4 py-2 text-left  ${
              activeLink === 1 ? "bg-sky-900" : "hover:bg-sky-900"
            }`}
            onClick={() => handleLinkClick(1)}
          >
            <Link className="block" to="">
              Services List
            </Link>
          </li>
          <li
            className={`px-4 py-2 text-left ${
              activeLink === 2 ? "bg-sky-900" : "hover:bg-sky-900"
            }`}
            onClick={() => handleLinkClick(2)}
          >
            <Link className="block" to="contact-us">
              Contact Us
            </Link>
          </li>
          <li
            className={`px-4 py-2 text-left ${
              activeLink === 3 ? "bg-sky-900" : "hover:bg-sky-900"
            }`}
            onClick={() => handleLinkClick(3)}
          >
            <Link className="block" to="aadhar">
              Aadhar Services
            </Link>
          </li>
          <li
            className={`px-4 py-2 text-left ${
              activeLink === 4 ? "bg-sky-900" : "hover:bg-sky-900"
            }`}
            onClick={() => handleLinkClick(4)}
          >
            <Link className="block" to="pan">
              Pan Card Services
            </Link>
          </li>
          <li
            className={`px-4 py-2 text-left ${
              activeLink === 5 ? "bg-sky-900" : "hover:bg-sky-900"
            }`}
            onClick={() => handleLinkClick(5)}
          >
            <Link className="block" to="election">
              Election Card
            </Link>
          </li>
          <li
            className={`px-4 py-2 text-left ${
              activeLink === 6 ? "bg-sky-900" : "hover:bg-sky-900"
            }`}
            onClick={() => handleLinkClick(6)}
          >
            <Link className="block" to="ration">
              Ration Card
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
