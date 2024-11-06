import React, { useContext, useState, useEffect } from 'react';
import { Usercontext } from '../../Store/UserContext';
import { useNavigate } from 'react-router-dom'; // Updated import
import SummaryApi from '../../common/Apis';

const UserDetails = () => {
  const user = useContext(Usercontext);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Updated to useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(SummaryApi.users.url, {
            method: SummaryApi.users.method,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
          }

          const userData = await response.json();
          setAllUsers(userData);
          setFilteredUsers(userData);
        } catch (error) {
          // console.error("Error fetching user profile:", error.message);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setError("No token found, please login.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const results = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, allUsers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleViewUser = (userId, index) => {
    navigate(`/admindashboard/user/${userId}`); // Use navigate for navigation
  };

  return (
    <div className="container mx-auto mt-4 ">
      <h1 className="text-2xl font-semibold mb-4">User Details</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        className="mb-4 px-4 py-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table-auto border-collapse w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleViewUser(user._id, index)} // Call the function with user ID and certificate index
                  >
                    View User
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border px-4 py-2 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
