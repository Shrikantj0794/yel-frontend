import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiChevronRight, BiHomeAlt, BiBarChartAlt2, BiBell, BiLogOut } from "react-icons/bi";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../../Store/UserContext";

const UserSidebar = () => {
  const [isClosed, setIsClosed] = useState(false); // Sidebar open/close state
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode toggle
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // Get the current location
  const { user,loading,error,setUser } = useContext(Usercontext);

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully!', {
      position: "top-right",
    });
    navigate('/home');
  };

  // Toggle Sidebar state (open/close)
  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Get the current path for active link styling
  const currentPath = location.pathname;

  return (
    <div className={`${isDarkMode ? "dark" : ""} flex`}>
      <nav className={`bg-[#075985] mt-3 h-screen fixed text-white dark:bg-ocean-800 min-h-screen transition-all duration-300 ${isClosed ? "w-20" : "w-64"} p-4`}>
        <header className="relative flex flex-col items-start">
          {/* Toggle button moved here */}
          <button onClick={toggleSidebar} className="bg-black text-white w-10 p-2 rounded-full absolute top-4 right-4 z-10">
            <BiChevronRight className={`transform transition-transform duration-300 ${isClosed ? "" : "rotate-180"}`} />
          </button>

          {/* User name and Edit button */}
          <div className={`mt-12 flex flex-col items-center ${isClosed ? "hidden" : ""}`}>
            {user && (
              <>
                <span className="text-lg text-ocean-500 dark:text-ocean-400">{user.name}</span>
                <button
                  className="mt-2 px-4 py-1 text-white text-sm rounded-lg hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => navigate('/profile')}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </header>

        <div className={`mt-10 ${isClosed ? "mt-14" : "mt-10"}`}>
          <ul className="space-y-4">
            <li>
              <Link to="/dashbord" className={`flex items-center space-x-4 hover:text-white hover:bg-sky-900 dark:hover:bg-ocean-700 p-2 rounded-md ${currentPath === '/dashbord' ? 'bg-sky-900' : ''}`}>
                <BiHomeAlt className="text-xl text-ocean-600 dark:text-ocean-400" />
                {!isClosed && <span className="text-md font-medium text-ocean-800 dark:text-ocean-100">Home </span>}
              </Link>
            </li>
            <li>
              <Link to="/userdashboard" className={`flex items-center space-x-4 hover:text-white hover:bg-sky-900 dark:hover:bg-ocean-700 p-2 rounded-md ${currentPath === '/userdashboard' ? 'bg-sky-900' : ''}`}>
                <BiHomeAlt className="text-xl text-ocean-600 dark:text-ocean-400" />
                {!isClosed && <span className="text-md font-medium text-ocean-800 dark:text-ocean-100">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link to="/userdashboard/serviceslist" className={`flex items-center space-x-4 hover:text-white hover:bg-sky-900 dark:hover:bg-ocean-700 p-2 rounded-md ${currentPath === '/userdashboard/serviceslist' ? 'bg-sky-900' : ''}`}>
                <BiBarChartAlt2 className="text-xl text-ocean-600 dark:text-ocean-400" />
                {!isClosed && <span className="text-md font-medium text-ocean-800 dark:text-ocean-100">Services list</span>}
              </Link>
            </li>
            <li>
              <Link to="/userdashboard/notifications" className={`flex items-center space-x-4 hover:text-white hover:bg-sky-900 dark:hover:bg-ocean-700 p-2 rounded-md ${currentPath === '/userdashboard/notifications' ? 'bg-sky-900' : ''}`}>
                <BiBell className="text-xl text-ocean-600 dark:text-ocean-400" />
                {!isClosed && <span className="text-md font-medium text-ocean-800 dark:text-ocean-100">Notifications</span>}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center space-x-4 hover:text-white hover:bg-sky-900 dark:hover:bg-ocean-700 p-2 rounded-md w-full">
                <BiLogOut className="text-xl text-ocean-600 dark:text-ocean-400" />
                {!isClosed && <span className="text-md font-medium text-ocean-800 dark:text-ocean-100">Logout</span>}
              </button>
            </li>

            {user?.role === 'admin' && (
              <li>
                <Link to="/Admindashboard" className={`flex items-center space-x-4 hover:text-black hover:bg-gray-100 dark:hover:bg-ocean-700 p-2 rounded-md ${currentPath === '/Admindashboard' ? 'bg-teal-500' : ''}`}>
                  <BiBell className="text-xl text-ocean-600 dark:text-ocean-400" />
                  {!isClosed && <span className="text-md font-medium text-ocean-800 dark:text-ocean-100">AdminDashboard</span>}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/* Main content area adjusted based on sidebar width, margin applied only for large screens */}
      <div className={`flex-1 transition-all duration-300 ${isClosed ? "lg:ml-20" : "lg:ml-64"}`}>
        {/* Render your main content here, like the AppliedCertificates component */}
      </div>
    </div>
  );
};

export default UserSidebar;
