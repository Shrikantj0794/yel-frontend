import React, { useState } from 'react';
import UserNavbar from '../Navbar/UserNavbar'; // Ensure this path is correct

const ProfilePage = () => {
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [fullName, setFullName] = useState(''); // State for full name
  const [mobileNumber, setMobileNumber] = useState(''); // State for mobile number
  const [emailId, setEmailId] = useState(''); // State for email ID
  const [address, setAddress] = useState(''); // State for address

  const handleSaveProfile = () => {
    // You can add validation here if needed

    setSuccessMessage('Profile has been successfully updated!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Adjust the time as needed
  };

  return (
    <div className="bg-blue-800">
      <UserNavbar /> {/* Render UserNavbar here */}

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
                  onChange={(e) => setFullName(e.target.value)} // Update state on change
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
                  onChange={(e) => setMobileNumber(e.target.value)} // Update state on change
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
                  onChange={(e) => setEmailId(e.target.value)} // Update state on change
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
                 e.target.style.height = 'auto'; // Reset the height
                e.target.style.height = `${e.target.scrollHeight}px`; // Dynamically set the height based on content
                }}
               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
               placeholder="Enter Address"
               rows="4"
                     style={{ overflow: 'hidden' }} // Hide scrollbar while resizing
                   />
                    </div>

            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleSaveProfile} // Call the handler on button click
                className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800"
              >
                Save Profile
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 text-green-600 text-center">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
