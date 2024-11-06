import React from 'react';

const UserNotification = () => {
  return (
    <div className="max-w-lg flex flex-col mx-auto mt-6 px-4 md:px-0">
      {/* First Card - Document Update */}
      <div className="border border-gray-300 rounded-lg shadow-sm mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-1 rounded-t-lg"></div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Notification <span className="ml-1">›</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Update the documents in your Aadhaar database for better service
            delivery and accurate Aadhaar-based authentication.
          </p>
          <a
            href="#"
            className="text-blue-600 font-medium mt-2 inline-block hover:underline"
          >
            Document update
          </a>
        </div>
      </div>

      {/* Second Card - Check Aadhaar Update Status */}
      <div className="border border-gray-300 rounded-lg shadow-sm">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-1 rounded-t-lg"></div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Notification <span className="ml-1">›</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Have already sent a request to get your address updated in Aadhaar?
          </p>
          <a
            href="#"
            className="text-blue-600 font-medium mt-2 inline-block hover:underline"
          >
            Check Aadhaar Update Status
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserNotification;
