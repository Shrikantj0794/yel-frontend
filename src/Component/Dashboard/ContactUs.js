import React from 'react';

const ContactUs = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full md:max-w-4xl p-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-orange-500 border-b-2 border-gray-300 pb-2 mb-6 text-center">
          Contact Us
        </h2>

        {/* Description */}
        <p className="text-lg mb-6 text-center md:text-left">
          If you want to know anything about services on this portal under the Right to Services Act 2015 or any other information, please call on the phone number below. 
          Our call centre representative will help you.
        </p>

        {/* Call Center Info */}
        <div className="bg-gray-100 p-6 rounded-md shadow-lg w-full max-w-lg mx-auto">
          <p className="text-sm text-red-500 mb-2 text-center">
            For Queries Contact numbers for clarifications
          </p>
          <h3 className="text-2xl font-bold text-gray-700 text-center">
            24 x 7 Citizen Call Center: 1234 567 890
          </h3>
          <p className="text-lg text-gray-700 mt-2 text-center">(Toll Free)</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
