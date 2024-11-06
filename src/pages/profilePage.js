import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from '../Component/Navbar/UserNavbar';
import { Usercontext } from "../Store/UserContext";
import SummaryApi from "../common/Apis";

const ProfilePage = () => {
  const { user, setUser } = useContext(Usercontext); // Assuming setUser is available to update user context

  const [fullName, setFullName] = useState(user.name);
  const [mobileNumber, setMobileNumber] = useState(user.phoneNo);
  const [emailId, setEmailId] = useState(user.email);
  const [address, setAddress] = useState(user.address);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`${SummaryApi.UpdateUser.url}/${user._id}`, {
        name: fullName,
        number: mobileNumber,
        email: emailId,
        address: address,
      });

      // Update user context with new data if successful
      setUser(response.data.user);

      // Display success toast
      toast.success('Profile has been successfully updated!');
    } catch (error) {
      console.error(error);
      // Display error toast
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="bg-white">
      <UserNavbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-8">
          <div className="p-5">
            <h2 className="text-2xl font-semibold text-center mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Full Name Field */}
              <div>
                <label className="text-sm text-gray-500 font-bold">Full Name (as per Aadhar card):</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Enter Full Name"
                />
              </div>
              
              {/* Mobile Number Field */}
              <div>
                <label className="text-sm text-gray-500 font-bold">Mobile Number:</label>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Email ID Field */}
              <div>
                <label className="text-sm text-gray-500 font-bold">Email ID:</label>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Enter email ID"
                />
              </div>

              {/* Address Field */}
              <div>
                <label className="text-sm text-gray-500 font-bold">Address:</label>
                <textarea
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Enter Address"
                  rows="4"
                  style={{ overflow: 'hidden' }}
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleSaveProfile}
                className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
