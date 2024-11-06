import { FaUser, FaTachometerAlt, FaBars, FaTimes } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Usercontext } from "../../Store/UserContext";

const UserNavbar = () => {
  const { user, loading, error, setUser } = useContext(Usercontext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", { position: "top-right" });
    navigate("/home");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    console.log("Updated user state:", user);
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center w-full">
        <img
          src="/images/YEL LOGO 2.png"
          alt="YEL Seva Logo"
          className="w-30 h-16 object-contain mr-4"
        />

        <button className="ml-auto text-2xl md:hidden" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* uncomment the div for the shifting the tabs in the navbar at the right side of the navbar */}
        <div className="flex justify-end w-full">
          <ul
            className={`md:flex flex-col md:flex-row md:space-y-0 md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-300 md:bg-transparent p-4 md:p-0 transition-transform duration-300 ease-in-out ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <li className="flex items-center p-4 rounded-md text-sm">
              <IoMdHome className="mr-1" />
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-900 underline transition duration-200"
                    : "hover:underline transition duration-200"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="flex items-center p-4 rounded-md text-sm">
              <FaUser className="mr-1" />
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-900 underline transition duration-200"
                    : "hover:underline transition duration-200"
                }
              >
                {loading ? "Loading..." : user?.name || "User"}
              </NavLink>
            </li>

            {user?.role === "normal" && (
              <li className="flex items-center p-2 rounded-md text-sm">
                <FaTachometerAlt className="mr-1" />
                <NavLink
                  to="/userdashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-900 underline transition duration-200"
                      : "hover:underline transition duration-200"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            {user?.role === "admin" && (
              <li className="flex items-center p-4 rounded-md text-sm">
                <FaTachometerAlt className="mr-1" />
                <NavLink
                  to="/admindashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-900 underline transition duration-200"
                      : "hover:underline transition duration-200"
                  }
                >
                  Admin Dashboard
                </NavLink>
              </li>
            )}
            {user?.role === "superadmin" && (
              <li className="flex items-center p-4 rounded-md text-sm">
                <FaTachometerAlt className="mr-1" />
                <NavLink
                  to="/superAdmin"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-900 underline transition duration-200"
                      : "hover:underline transition duration-200"
                  }
                >
                  SuperAdmin
                </NavLink>
              </li>
            )}

            <li className="flex items-center p-4 rounded-md text-sm">
              <FaTachometerAlt className="mr-1" />
              <NavLink
                to="/careers"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-900 underline transition duration-200"
                    : "hover:underline transition duration-200"
                }
              >
                Careers
              </NavLink>
            </li>
            {token && (
              <li className="md:hidden mt-4">
                <button
                  onClick={handleLogout}
                  className="bg-orange-600 h-10 w-full text-white py-2 px-4 rounded-full hover:bg-orange-700"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {token && (
        <button
          onClick={handleLogout}
          className="hidden md:block bg-orange-600 h-10 text-white py-2 px-4 rounded-full hover:bg-orange-700"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default UserNavbar;
