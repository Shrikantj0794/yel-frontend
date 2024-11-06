import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common/Apis";

const AadharService = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(SummaryApi.addDepartment.url); // Replace with your API endpoint
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handlenavigate = (certificatename) => {
    navigate("/service", { state: { certificatename } });
  };

  return (
    <div className="flex flex-col w-full items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full md:max-w-4xl p-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-orange-500 border-b-2 border-gray-300 pb-2 mb-6 text-center">
          Aadhaar Services
        </h2>

        {/* Cards Container */}
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto ml-6 mt-6">
          {departments.map((department) =>
            department.name === "Aadhar Services" ? (
              department.certificates && department.certificates.length > 0 ? (
                department.certificates.map((certificate, index) => (
                  <div key={index} className="border w-full max-w-xs border-gray-600 rounded-lg shadow-sm mb-4">
                    <div className="bg-gradient-to-r from-red-500 to-teal-400 h-1 rounded-t-lg"></div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {certificate.name} <span className="ml-1">›</span>
                      </h2>
                     
                      <a
                        onClick={() => handlenavigate(certificate.name)}
                          className="mt-4 inline-block text-white bg-blue-500 cursor-pointer hover:bg-blue-600 px-4 py-2 rounded"
                      >
                        Apply
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>No certificates available for this department.</p>
              )
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default AadharService;
