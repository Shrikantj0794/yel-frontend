import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import SummaryApi from "../../common/Apis"; // Adjust the import based on your file structure

const AdminUserManagement = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleChangePopup, setShowRoleChangePopup] = useState(false);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false); // New state for delete confirmation popup
  const [userToDelete, setUserToDelete] = useState(null); // New state to store the user to delete

  // Fetch admin users from the API
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axios.get(SummaryApi.users.url); // Adjust the URL according to your API
        setAdminUsers(response.data);
      } catch (error) {
        console.error("Error fetching admin users:", error);
        setError("Failed to fetch admin users.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  // Change user role
  const handleChangeRole = async (userId, newRole) => {
    try {
      await axios.post(SummaryApi.changeRole.url, {
        userId,
        newRole,
      });
      setAdminUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success(`User role changed to ${newRole}!`);
      setShowRoleChangePopup(false); // Close popup after role change
    } catch (error) {
      console.error("Error changing user role:", error);
      toast.error("Failed to change user role.");
    }
  };

  // Open delete confirmation popup
  const openDeleteConfirmPopup = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmPopup(true);
  };

  // Close delete confirmation popup
  const closeDeleteConfirmPopup = () => {
    setUserToDelete(null);
    setShowDeleteConfirmPopup(false);
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await axios.delete(`${SummaryApi.deleteUser.url}/${userToDelete._id}`); // Adjust URL for deleting user
      setAdminUsers(adminUsers.filter((user) => user._id !== userToDelete._id));
      toast.success("User deleted successfully.");
      closeDeleteConfirmPopup(); // Close the popup after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  // Open role change pop-up
  const openRoleChangePopup = (user) => {
    setSelectedUser(user);
    setShowRoleChangePopup(true);
  };

  // Close role change pop-up
  const closeRoleChangePopup = () => {
    setSelectedUser(null);
    setShowRoleChangePopup(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin User Management</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => openRoleChangePopup(user)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => openDeleteConfirmPopup(user)}
                  className="text-red-600 hover:underline"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Role Change Popup */}
      {showRoleChangePopup && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">
              Change Role for {selectedUser.name}
            </h2>
            <div className="flex flex-col">
              <label className="mb-2">
                <input
                  type="radio"
                  name="role"
                  value="normal"
                  checked={selectedUser.role === "normal"}
                  onChange={() => handleChangeRole(selectedUser._id, "normal")}
                />{" "}
                Normal User
              </label>
              <label className="mb-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedUser.role === "admin"}
                  onChange={() => handleChangeRole(selectedUser._id, "admin")}
                />{" "}
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="superadmin"
                  checked={selectedUser.role === "superadmin"}
                  onChange={() =>
                    handleChangeRole(selectedUser._id, "superadmin")
                  }
                />{" "}
                Super Admin
              </label>
            </div>
            <div className="mt-4">
              <button
                onClick={closeRoleChangePopup}
                className="text-white bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmPopup && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete {userToDelete.name}?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={closeDeleteConfirmPopup}
                className="text-white bg-gray-600 hover:bg-gray-800 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
