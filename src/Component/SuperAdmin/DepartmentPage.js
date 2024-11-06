import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentPage = () => {
  return (
    <>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-6 max-w-md md:max-w-2xl lg:max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-4">Department Management</h2>

        <div className="flex flex-col sm:flex-row sm:justify-around sm:space-y-0 space-y-4 sm:space-x-4 m-4">
          <div className="w-full sm:w-96">
            <Link
              to="/superAdmin/addCertificate"
              className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            >
              Add Certificate
            </Link>
          </div>

          <div className="w-full sm:w-96">
            <Link
              to="/superAdmin/addDepartment"
              className="block w-full text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            >
              Add Department
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;
