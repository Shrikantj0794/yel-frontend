import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentPage = () => {
  return (<>
  
 
    <div className=" mx-auto p-6 bg-white shadow-md rounded-lg mt-6 ">
    <h2 className="text-2xl font-bold text-center mb-4">Department Management</h2>

      <div className='flex justify-around m-10'>

   
     
      <div className="mb-4 w-96">
        <Link
          to="/Admindashboard/addCertificate" // Link to your Add Certificate page
          className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mb-2"
        >
          Add Certificate
        </Link>
      </div>
      <div className="mb-4 w-96">
        <Link
          to="/Admindashboard/addDepartment" // Link to your Add Department page
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
