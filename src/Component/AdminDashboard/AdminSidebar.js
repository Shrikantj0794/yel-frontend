import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiChevronRight, BiHomeAlt, BiBarChartAlt2, BiLogOut ,BiTask  } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Usercontext } from "../../Store/UserContext";

const AdminSidebar = () => {
  const [isClosed, setIsClosed] = useState(false); // Sidebar open/close state
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // Get the current location
  const { user, loading, error, setUser } = useContext(Usercontext);

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

  // Get the current path for active link styling
  const currentPath = location.pathname;

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <nav className={`bg-[#075985] mt-3 h-screen fixed text-white dark:bg-ocean-800 transition-all duration-300 ${isClosed ? "w-20" : "w-64"} p-4`}>
        <header className="relative flex flex-col items-start">
          {/* Sidebar Toggle Button */}
          <button onClick={toggleSidebar} className="bg-black text-white w-10 p-2 rounded-full absolute top-4 right-4 z-10">
            <BiChevronRight className={`transform transition-transform duration-300 ${isClosed ? "" : "rotate-180"}`} />
          </button>

          {/* User name and YEL-SEVA title */}
          <div className={`mt-12 flex flex-col items-center ${isClosed ? "hidden" : ""}`}>
            <span className="text-lg font-semibold text-ocean-900 dark:text-ocean-100">YEL-SEVA</span>
            {user && <span className="text-sm text-ocean-500 dark:text-ocean-400">{user.name}</span>}
          </div>
        </header>

        <div className={`mt-10 ${isClosed ? "mt-14" : "mt-10"}`}>
          <ul className="space-y-4">
            {/* Sidebar Links */}
            {[
              { to: "/dashbord", label: "HOME", icon: <BiHomeAlt /> },
              { to: "/admindashboard/allcertificates", label: "All Certificates", icon: <BiBarChartAlt2 /> },
              { to: "/admindashboard/tasks", label: "Tasks", icon: <BiTask/>  },
              { to: "/admindashboard", label: "User Details", icon: <FaUsers /> },
              // { to: "/admindashboard/department", label: "Service Management", icon: <BiBarChartAlt2 /> },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className={`flex items-center space-x-4 hover:text-white hover:bg-sky-900 dark:hover:bg-ocean-700 p-2 rounded-md ${currentPath === link.to ? 'bg-sky-900' : ''}`}
                >
                  {link.icon}
                  {!isClosed && <span className="text-md font-medium text-ocean-800 dark:text-ocean-100">{link.label}</span>}
                </Link>
              </li>
            ))}
            
            {/* Logout Button */}
            <li>
              <button onClick={handleLogout} className="flex items-center space-x-4 hover:bg-sky-900 dark:hover:bg-ocean-700 p-2 rounded-md w-full">
                <BiLogOut className="text-xl text-ocean-600 dark:text-ocean-400" />
                {!isClosed && <span className="text-md font-medium text-ocean-800 dark:text-ocean-100">Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content area adjusted based on sidebar width */}
      <div className={`flex-1 transition-all duration-300 ${isClosed ? "lg:ml-20" : "lg:ml-64"}`}>
        {/* Render main content here */}
      </div>
    </div>
  );
};

export default AdminSidebar;
