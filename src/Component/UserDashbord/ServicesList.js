import React, { useEffect, useRef, useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import PopModel from "../Model/PopModel"; // Import the PopModel component
import SummaryApi from "../../common/Apis";

const ServicesList = ({ isClosed }) => {
  const [departments, setDepartments] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch departments and certificates from server
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(SummaryApi.addDepartment.url);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Auto scroll functionality
  // const scrollbarDivRef = useRef(null);
  // useEffect(() => {
  //   if (isScrolling) return;
  //   const scrollableDiv = scrollbarDivRef.current;
  //   let scrollStep = 2; // speed of scrolling in pixels
  //   let scrollDirection = 1; // 1 for down and -1 for up

  //   const autoScroll = () => {
  //     if (scrollableDiv.scrollTop + scrollableDiv.clientHeight >= scrollableDiv.scrollHeight) {
  //       scrollDirection = -1;
  //     } else if (scrollableDiv.scrollTop <= 0) {
  //       scrollDirection = 1;
  //     }
  //     scrollableDiv.scrollTop += scrollStep * scrollDirection;
  //   };
  //   const interval = setInterval(autoScroll, 50);
  //   return () => clearInterval(interval);
  // }, [isScrolling]);

  // const toggleScrolling = () => setIsScrolling(!isScrolling);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter departments and certificates based on search term
  const filteredDepartments = departments
    .map((department) => ({
      ...department,
      certificates: department.certificates.filter((certificate) =>
        certificate.name.toLowerCase().includes(searchTerm)
      ),
    }))
    .filter(
      (department) =>
        department.name.toLowerCase().includes(searchTerm) ||
        department.certificates.length > 0
    );

  return (
    <div className={`flex-1 ${isClosed ? 'ml-20' : 'ml-50'} p-4 transition-all duration-300`}>
      <h1 className="text-xl font-bold text-center mb-4">Services Available Online</h1>
      <input
        className="w-full p-2 my-4 rounded-md border border-black text-black focus:outline-none"
        type="text"
        placeholder="Search Here"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div  className="p-1 overflow-y-auto h-screen scrollbar-thin w-full">
        <div className="space-y-8 mt-4">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department) => (
              <div key={department.id}>
                <h2 className="text-lg font-bold">{department.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {department.certificates.map((certificate) => (
                    <div
                      key={certificate._id}
                      className="p-4 bg-[#075985] text-white rounded-md cursor-pointer mb-2"
                      onClick={() => handleCertificateClick(certificate)}
                    >
                      {certificate.name}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No results found</p>
          )}
        </div>
      </div>

      {/* Modal for selected certificate */}
      {showModal && (
        <PopModel
          certificate={selectedCertificate}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ServicesList;
