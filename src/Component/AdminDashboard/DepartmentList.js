import React from 'react';

const DepartmentList = ({ departments }) => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">All Departments</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div 
            key={dept._id} 
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-3">{dept.name}</h3>
            
            <ul className="list-disc list-inside">
              {dept.certificates.map((cert) => (
                <li key={cert.name} className="mb-4">
                  <strong className="text-gray-700">{cert.name}</strong>
                  <p className="text-sm text-gray-500">{cert.description || 'No description available'}</p>
                  
                  <div className="mt-2">
                    <strong className="text-gray-800">Proof of Identity:</strong>
                    <ul className="list-disc list-inside pl-4">
                      {cert.proofOfIdentity.map((poi, index) => (
                        <li key={index} className="text-sm text-gray-600">{poi}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2">
                    <strong className="text-gray-800">Proof of Address:</strong>
                    <ul className="list-disc list-inside pl-4">
                      {cert.proofOfAddress.map((poa, index) => (
                        <li key={index} className="text-sm text-gray-600">{poa}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
