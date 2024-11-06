import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { toast } from 'react-toastify';

const Agriculture = () => {
  const [subDepartment, setSubDepartment] = useState('');
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSubDepartmentChange = (event) => {
    setSubDepartment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Selected Sub Department:', subDepartment);

    // Navigate based on the selected sub department
    if (subDepartment === 'Agriculture Licensing Services') {
      navigate('/agriculture');
    } else {
      alert('Please select a valid Sub Department');
    }
  };

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
  
    // Show success toast
    toast.success('Logged out successfully!', {
      position: "top-right",
    });
  console.log('redirecting to the page')
    // Redirect to login or home page
    navigate('/login'); // Adjust the route as needed
  };
  

  return (
    <div className="flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 ml-10">
        <h1 className="text-3xl font-bold text-orange-600">
          Department: <span className="text-green-600">Agriculture</span>
        </h1>

        <hr className="border-t-2 border-orange-600 my-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="font-semibold" htmlFor="subDepartment">
              Sub Department <span className="text-red-600">*</span>
            </label>
            <select
              id="subDepartment"
              className="border border-gray-300 rounded p-2"
              value={subDepartment}
              onChange={handleSubDepartmentChange}
            >
              <option value="">---Select---</option>
              <option value="Agriculture - Vidyapeeth and APEDA Services">
                Agriculture - Vidyapeeth and APEDA Services
              </option>
              <option value="Agriculture Licensing Services">
                Agriculture Licensing Services
              </option>
            </select>
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Proceed
            </button>


          </div>
        </form>
        <button onClick={handleLogout} className="bg-red-800 text-white py-2 px-4 rounded hover:bg-black" >logout</button>

        {/* Additional Content */}
        <div className="mt-8">
          {/* Placeholder for future content */}
        </div>
      </div>
    </div>
  );
};

export default Agriculture;
