import React, { useEffect, useRef, useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import PopModel from "../Model/PopModel"; // Import the PopModel component
import SummaryApi from "../../common/Apis";

const ServicesAvailable = () => {
  const [departments, setDepartments] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const scrollbarDivRef = useRef(null);
  useEffect(() => {
    if (isScrolling) return;
    const scrollableDiv = scrollbarDivRef.current;
    let scrollStep = 2;
    let scrollDirection = 1;

    const autoScroll = () => {
      if (
        scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
        scrollableDiv.scrollHeight
      )  {
        scrollDirection = -1;
      } else if (scrollableDiv.scrollTop <= 0) {
        scrollDirection = 1;
      }
      scrollableDiv.scrollTop += scrollStep * scrollDirection;
    };
    const interval = setInterval(autoScroll, 50);
    return () => clearInterval(interval);
  }, [isScrolling]);

  const toggleScrolling = () => {
    setIsScrolling(!isScrolling);
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

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
    <div>
      <div className="w-full rounded-md mt-7  pb-9 text-base md:text-lg lg:text-xl xl:text-2xl ">
      <h1 className="rounded-t-md text-gray-800 flex justify-center pt-3 text-2xl font-semibold">
          Services Available Online
        </h1>
        <div className="h-full p-4">
          <div className="text-gray-700 text-sm font-bold flex justify-between items-center mb-3">
            <span>Click below services for details</span>
            <div
              onClick={toggleScrolling}
              className="cursor-pointer flex items-center gap-1 hover:text-gray-800 transition"
            >
              <span className="text-xl">
                {isScrolling ? <FaToggleOn /> : <FaToggleOff />}
              </span>
              Toggle auto scrolling
            </div>
          </div>

          <input
            className="w-full text-gray-800 p-2 mb-4 text-sm border-none focus:outline-none shadow-inner"
            type="text"
            placeholder="Search here online service"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <div
            ref={scrollbarDivRef}
            className="p-2 overflow-y-auto h-72 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 w-full"
          >
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((department, deptIndex) => (
                <div key={deptIndex}>
                  <h1 className="text-black text-lg font-semibold mb-4 md:text-xl bg-gray-800 bg-opacity-40 p-2 rounded-md">
                    {department.name}
                  </h1>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {department.certificates.map((certificate) => (
                      <div
                        key={certificate._id}
                        className=" border bg-[#075985] border-gray-400 text-white flex place-items-center justify-center p-1 text-lg text-center rounded-md hover:bg-[#4f9dc7] hover:text-black  transition cursor-pointer"
                        onClick={() => handleCertificateClick(certificate)}
                      >
                        <h2 className="text-sm md:text-lg">{certificate.name}</h2>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-300">No results found</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <PopModel
          certificate={selectedCertificate}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ServicesAvailable;