import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common/Apis";

const ElectionService = () => {
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
  console.log("this is the array or depatment", departments);

  const handlenavigate = (certificatename) => {
    navigate("/service", { state: { certificatename } });
  };
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center p-4">{/* Main Container */}
      <div className="w-full md:max-w-4xl p-4">{/* Inner Container */}
        <h2 className="text-3xl flex justify-center font-bold text-orange-500 border-b-2 border-gray-300 pb-2 mb-6">
          Application for Election Card Services
        </h2>
        <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-2 p-4">
          {departments.map(
            (department) =>
              department.name === "Election Services" && ( // Check if department name is "Aadhar Services"
                <div key={department.id} className="flex gap-4">
                  {department.certificates &&
                  department.certificates.length > 0 ? (
                    department.certificates.map((certificate, index) => (
                      <div key={index}>
                        <div className="border w-96 border-gray-600 rounded-lg shadow-sm mb-4">
                          <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                              {certificate.name}
                              <span className="ml-1">›</span>
                            </h2>
                            <a
                              onClick={() => handlenavigate(certificate.name)} // Pass the function on click
                              className="mt-4 inline-block text-white bg-blue-500 cursor-pointer hover:bg-blue-600 px-4 py-2 rounded"
                            >
                              Apply
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-black">
                      No certificates available for this department.
                    </p>
                  )}
                </div>
              )
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default ElectionService;
