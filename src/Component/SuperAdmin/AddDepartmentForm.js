import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common/Apis';

const proofOfIdentityOptions = [
  { value: 'Passport', label: 'Passport' },
  { value: 'Driving License', label: 'Driving License' },
  { value: 'Aadhaar Card(BothSide)', label: 'Aadhaar Card(Both Side)' },
  { value: 'Aadhaar Card(All Family Members)', label: 'Aadhaar Card(All Family Members)' },
  { value: 'Pan Card(BothSide)', label: 'Pan Card(Both Side)' },
  { value: 'Voter ID', label: 'Voter ID' },
  { value: 'Photo', label: 'Photo' },
  { value: 'Signature', label: 'Signature' },
  { value: 'Old Pan Card', label: 'Old Pan Card' }
];

const proofOfAddressOptions = [
  { value: 'Utility Bill', label: 'Utility Bill' },
  { value: 'Rental Agreement', label: 'Rental Agreement' },
  { value: 'Bank Statement', label: 'Bank Statement' },
  { value: 'Driving License', label: 'Driving License' },
  { value: 'Electricity Bill(within 3 months)', label: 'Electricity Bill(within 3 months)' }
];

const AddDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [certificates, setCertificates] = useState([
    { name: '', description: '', amount: '', proofOfIdentity: null, proofOfAddress: null }
  ]);

  const handleDepartmentChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const addNewCertificate = () => {
    setCertificates([...certificates, { name: '', description: '', amount: '', proofOfIdentity: null, proofOfAddress: null }]);
  };

  const resetForm = () => {
    setDepartmentName('');
    setCertificates([{ name: '', description: '', amount: '', proofOfIdentity: null, proofOfAddress: null }]);
  };

  const addNewDepartment = async () => {
    const formattedCertificates = certificates.map(cert => ({
      name: cert.name,
      description: cert.description,
      amount: cert.amount,
      proofOfIdentity: cert.proofOfIdentity ? cert.proofOfIdentity.map(option => option.value) : [],
      proofOfAddress: cert.proofOfAddress ? cert.proofOfAddress.map(option => option.value) : []
    }));

    try {
      const response = await axios.post(SummaryApi.addDepartment.url, { name: departmentName, certificates: formattedCertificates });
      toast.success(response.data.message);
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error('Error adding department:', error);
      toast.error('Failed to add department');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg mt-6">
      <ToastContainer />
      <h2 className="text-xl font-bold text-center mb-3">Add New Department</h2>
      <input
        type="text"
        className="block w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={departmentName}
        onChange={handleDepartmentChange}
        placeholder="Department Name"
      />
      <h3 className="text-lg font-semibold mb-2">Certificates</h3>

      {certificates.map((certificate, index) => (
        <div key={index} className="mb-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Certificate Name</label>
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={certificate.name}
              onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
              placeholder="Certificate Name"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={certificate.description}
              onChange={(e) => handleCertificateChange(index, 'description', e.target.value)}
              placeholder="Description"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={certificate.amount}
              onChange={(e) => handleCertificateChange(index, 'amount', e.target.value)}
              placeholder="Amount"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Proof of Identity</label>
            <Select
              options={proofOfIdentityOptions}
              value={certificate.proofOfIdentity}
              onChange={(selectedOption) => handleCertificateChange(index, 'proofOfIdentity', selectedOption)}
              className="w-full"
              placeholder="Select Proof of Identity"
              isClearable
              isMulti
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Proof of Address</label>
            <Select
              options={proofOfAddressOptions}
              value={certificate.proofOfAddress}
              onChange={(selectedOption) => handleCertificateChange(index, 'proofOfAddress', selectedOption)}
              className="w-full"
              placeholder="Select Proof of Address"
              isClearable
              isMulti
            />
          </div>
        </div>
      ))}

      <button
        onClick={addNewCertificate}
        className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3"
      >
        Add Another Certificate
      </button>

      <button
        onClick={addNewDepartment}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Department
      </button>
    </div>
  );
};

export default AddDepartmentForm;
