import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import SummaryApi from '../../common/Apis';

// Proof of Identity Options
const proofOfIdentityOptions = [
  { value: 'PAN Card', label: 'PAN Card' },
  { value: 'Photo', label: 'Photo' },
  { value: 'Signature', label: 'Signature' },
  { value: 'Old Pan Card', label: 'Old Pan Card' },
  { value: 'Passport', label: 'Passport' },
  { value: 'RSBY Card', label: 'RSBY Card' },
  { value: 'Aadhaar Card', label: 'Aadhaar Card' },
  { value: 'Voter ID Card', label: 'Voter ID Card' },
  { value: 'MNREGA Job Card', label: 'MNREGA Job Card' },
  { value: 'Driving License', label: 'Driving License' },
  { value: 'Photo of Applicant', label: 'Photo of Applicant' },
  { value: 'Signature of Applicant', label: 'Signature of Applicant' },
  { value: 'Identity card issued by Govt or Semi Govt organizations', label: 'Identity card issued by Govt or Semi Govt organizations' }
];

// Proof of Address Options
const proofOfAddressOptions = [
  { value: 'Passport', label: 'Passport' },
  { value: 'Water Bill', label: 'Water Bill' },
  { value: 'Ration Card', label: 'Ration Card' },
  { value: 'Aadhaar Card', label: 'Aadhaar Card' },
  { value: 'Voter ID Card', label: 'Voter ID Card' },
  { value: 'Telephone Bill', label: 'Telephone Bill' },
  { value: 'Driving License', label: 'Driving License' },
  { value: 'Electricity Bill', label: 'Electricity Bill' },
  { value: 'Property Tax Receipt', label: 'Property Tax Receipt' },
  { value: 'Extracts of 7/12 and 8 A/Rent Receipt', label: 'Extracts of 7/12 and 8 A/Rent Receipt' }
];

const AddCertificateForm = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [certificates, setCertificates] = useState([{ name: '', description: '', proofOfIdentity: [], proofOfAddress: [], amount: '' }]);
  const [message, setMessage] = useState('');

  // Function to add certificates to a department
  const addCertificatesToDepartment = async (departmentName, formattedCertificates) => {
    try {
      const response = await axios.post(SummaryApi.addCertificates.url, {
        departmentName,
        newCertificates: formattedCertificates,
      });
      setMessage(response.data.message);
      toast.success(response.data.message); // Show success message
      resetForm();
    } catch (error) {
      console.error('Error adding certificates:', error);
      setMessage('Failed to add certificates');
      toast.error('Failed to add department'); // Show error message
    }
  };

  const handleDepartmentChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const addNewCertificate = () => {
    setCertificates([...certificates, { name: '', description: '', proofOfIdentity: [], proofOfAddress: [], amount: '' }]);
  };

  const addNewDepartment = () => {
    const formattedCertificates = certificates.map(cert => ({
      ...cert,
      proofOfIdentity: cert.proofOfIdentity.map(option => option.value),
      proofOfAddress: cert.proofOfAddress.map(option => option.value)
    }));
    addCertificatesToDepartment(departmentName, formattedCertificates);
  };

  const resetForm = () => {
    setDepartmentName('');
    setCertificates([{ name: '', description: '', proofOfIdentity: [], proofOfAddress: [], amount: '' }]);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(SummaryApi.addDepartment.url); // Replace with your API endpoint
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }

    fetchDepartments();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-6">
      <ToastContainer /> {/* Toast Container for notifications */}
      <h2 className="text-xl font-bold text-center mb-2">Add New Certificates</h2>
      <select
        className="block w-full p-1 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        value={departmentName}
        onChange={handleDepartmentChange}
      >
        <option value="" disabled>
          Select Department
        </option>
        {departments.map((department) => (
          <option key={department._id} value={department.name}>
            {department.name}
          </option>
        ))}
      </select>
      <h3 className="text-lg font-semibold mb-1">Certificates</h3>

      {certificates.map((certificate, index) => (
        <div key={index} className="mb-4">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Certificate Name</label>
            <input
              type="text"
              className="block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={certificate.name}
              onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
              placeholder="Certificate Name"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              className="block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={certificate.description}
              onChange={(e) => handleCertificateChange(index, 'description', e.target.value)}
              placeholder="Description"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              className="block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={certificate.amount}
              onChange={(e) => handleCertificateChange(index, 'amount', e.target.value)}
              placeholder="Amount"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Proof of Identity</label>
            <Select
              options={proofOfIdentityOptions}
              value={certificate.proofOfIdentity}
              onChange={(selectedOptions) => handleCertificateChange(index, 'proofOfIdentity', selectedOptions)}
              className="w-full"
              isMulti
              placeholder="Select Proof of Identity"
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: '38px', // Minimum height for the control
                  fontSize: '0.875rem' // Font size for better readability
                })
              }}
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Proof of Address</label>
            <Select
              options={proofOfAddressOptions}
              value={certificate.proofOfAddress}
              onChange={(selectedOptions) => handleCertificateChange(index, 'proofOfAddress', selectedOptions)}
              className="w-full"
              isMulti
              placeholder="Select Proof of Address"
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: '38px', // Minimum height for the control
                  fontSize: '0.875rem' // Font size for better readability
                })
              }}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addNewDepartment}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
      >
        Add Department
      </button>

      {message && <p className="mt-2 text-center text-green-500">{message}</p>} {/* Message to display status */}
    </div>
  );
};

export default AddCertificateForm;
