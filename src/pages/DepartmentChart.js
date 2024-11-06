import React from "react";
import Sidebar from "../Component/Dashboard/Sidebar";

const DepartmentChart = () => {
  const data = [
    {
      id: 1,
      service: "Age, Nationality, and Domicile Certificate",
      days: 15,
      officer: "Tahsildar",
      firstAppeal: "Sub-Divisional Officer",
      secondAppeal: "Additional Collector",
      available: "Yes",
    },
    {
      id: 2,
      service: "Caste Certificate",
      days: 21,
      officer: "Sub-Divisional Officer / Dy. Collector",
      firstAppeal: "Additional Collector",
      secondAppeal: "Collector",
      available: "No",
    },
    {
      id: 3,
      service: "Income Certificate",
      days: 15,
      officer: "Nayab Tahsildar",
      firstAppeal: "Tahsildar",
      secondAppeal: "Sub-Divisional Officer",
      available: "Yes",
    },
    {
      id: 4,
      service: "Non Creamy Layer Certificate",
      days: 21,
      officer: "Sub-Divisional Officer",
      firstAppeal: "Additional Collector",
      secondAppeal: "Collector",
      available: "No",
    },
    {
      id: 5,
      service: "Temporary Residence Certificate",
      days: 7,
      officer: "Tahsildar",
      firstAppeal: "Sub-Divisional Officer",
      secondAppeal: "Collector",
      available: " Yes",
    },
    {
      id: 6,
      service: "Senior Citizen Certificate",
      days: 7,
      officer: "Tahsildar",
      firstAppeal: "Sub-Divisional Officer",
      secondAppeal: "Additional Collector",
      available: "Yes",
    },
    {
      id: 7,
      service: "Landless Labour Certificate",
      days: 15,
      officer: "Tahsildar",
      firstAppeal: "Sub-Divisional Officer",
      secondAppeal: "Additional Collector",
      available: "Yes",
    },
    {
      id: 8,
      service: "Agriculturist Certificate",
      days: 15,
      officer: "Tahsildar",
      firstAppeal: "Sub-Divisional Officer",
      secondAppeal: "Additional Collector",
      available: "Yes",
    },
    {
      id: 9,
      service: "Permission for Cultural Programme",
      days: 7,
      officer: "Tahsildar and Taluka Executive Magistrate",
      firstAppeal: "Sub-Divisional Magistrate",
      secondAppeal: "Additional District Magistrate",
      available: "Yes",
    },
    {
      id: 10,
      service: "Small Land Holder Certificate",
      days: 15,
      officer: "Tahsildar",
      firstAppeal: "Sub-Divisional Officer",
      secondAppeal: "Additional Collector",
      available: "Yes",
    },
    {
      id: 11,
      service: "Certificate of Resldence in Hilly Area",
      days: 7,
      officer: "Tahsildar",
      firstAppeal: "Sub-Divisional Officer",
      secondAppeal: "Additional Collector",
      available: "Yes",
    },
    // Add more services here...
  ];

  return (
    <div className="flex">
      {/* Sidebar Component */}
      

      {/* Main Content */}
      <div className="flex-grow container mx-auto  h-screen pl-4 md:pl-64"> {/* Adjusted margin-left here */}
        <div className="bg-white shadow-lg rounded-lg p-3">
          <h2 className="text-2xl font-bold text-center text-white bg-sky-700 py-2 mb-6 rounded-md">
            Department Notified Services
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-solid border-black  bg-sky-200">
                  Sr. No
                </th>
                <th className="py-2 px-4 border bg-sky-200 border-black text-gray-700">
                  Public Service
                </th>
                <th className="py-2 px-4 border bg-sky-200 border-black text-gray-700">
                  Time limit (Days)
                </th>
                <th className="py-2 px-4 border bg-sky-200 border-black text-gray-700">
                  Designated Officer
                </th>
                <th className="py-2 px-4 border bg-sky-200 border-black text-gray-700">
                  First Appellate Officer
                </th>
                <th className="py-2 px-4 border bg-sky-200 border-black text-gray-700">
                  Second Appellate Officer
                </th> 
                <th className="py-2 px-4 border bg-sky-200 border-black text-gray-700">
                  Available at YEL-Seva
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border border-black text-center">{index + 1}</td>
                  <td className="py-2 px-4 border border-black">{item.service}</td>
                  <td className="py-2 px-4 border border-black text-center">{item.days}</td>
                  <td className="py-2 px-4 border border-black">{item.officer}</td>
                  <td className="py-2 px-4 border border-black">{item.firstAppeal}</td>
                  <td className="py-2 px-4 border border-black">{item.secondAppeal}</td>
                  <td className="py-2 px-4 border border-black text-center">
                    {item.available}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChart;