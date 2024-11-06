import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar

const AgricultureLicensingServices = () => {
  const [selectedService, setSelectedService] = useState('');

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You selected: ${selectedService}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 ml-64">
        <h2 className="text-3xl font-bold text-green-600">Department: Agriculture</h2>
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-lg font-semibold">
              Sub Department <span className="text-red-500">*</span>
            </label>
            <select className="border border-gray-300 p-2 rounded w-full" defaultValue="Agriculture Licensing Services">
              <option value="Agriculture Licensing Services">Agriculture Licensing Services</option>
              {/* Add more options here if needed */}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              'Testing of Fertilizer sample',
              'Issue licence to carry on the business of manufacture/Dealer fertilizer (State level)',
              'Issue licence to carry on the business of manufacture/Dealer Insecticide (State level)',
              'Registration of Micro-irrigation system (Drip/sprinkler) manufacturer',
              'Testing of Insecticide Sample',
              'Cotton Dealer Licence Registration',
              'Insecticides Dealer Licence Registration',
              'Seed Dealer Licence Registration',
              'Fertiliser Dealer Licence Registration',
              'Fertiliser Manufacturer Licence Registration',
              'Insecticides Manufacturer Licence Registration',
              'Soil & water sample testing',
              'Testing of Seed Sample',
              'Issue licence to carry on the business of Dealer in seed (State level)',
            ].map((service, index) => (
              <label key={index} className="bg-blue-100 p-3 rounded block cursor-pointer">
                <input
                  type="radio"
                  name="service"
                  value={service}
                  checked={selectedService === service}
                  onChange={handleServiceChange}
                  className="mr-2"
                />
                {service}
              </label>
            ))}
          </div>

          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgricultureLicensingServices;
