import React, { useState, useEffect } from 'react';
import SummaryApi from '../../common/Apis';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";

const AssignedTaskPage = () => {
  const [assignedCertificates, setAssignedCertificates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [revertCertificateId, setRevertCertificateId] = useState(null);
  const [issueText, setIssueText] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const documentOptions = [
    { value: "ID Proof", label: "ID Proof" },
    { value: "Address Proof", label: "Address Proof" },
    { value: "Birth Certificate", label: "Birth Certificate" },
    { value: "Income Proof", label: "Income Proof" },
  ];

  const statusOptions = ['pending', 'approved', 'rejected'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const fetchAssignedData = async () => {
        try {
          const url = `${SummaryApi.assignedCertificates.url}/${userId}`;
          const response = await axios.get(url);
          setAssignedCertificates(response.data.assignedCertificates || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAssignedData();
    } else {
      setError('No token found, please login.');
      setLoading(false);
    }
  }, []);

  const filteredCertificates = assignedCertificates.filter((certificate) => {
    const certificateName = certificate.certificateName || '';
    return certificateName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleStatusChange = async (certificateId, newStatus) => {
    const url = `${SummaryApi.CertificatesStatusHandle.url}/${certificateId}/status`;
    setUpdating(true);

    try {
      const response = await axios.put(url, { status: newStatus });

      if (response.status === 200) {
        setAssignedCertificates((prevCertificates) =>
          prevCertificates.map((cert) =>
            cert._id === certificateId ? { ...cert, status: newStatus } : cert
          )
        );
        console.log('Status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating certificate status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRevertClick = (certificateId) => {
    setRevertCertificateId(certificateId);
    setIsModalOpen(true);
  };

  const handleRevertSubmit = async () => {
    // Validate the issue text before submitting
    if (!issueText.trim()) {
      alert('Please enter a reason for the revert.');
      return;
    }

    try {
      const url = `${SummaryApi.CertificatesRevertHandle.url}/${revertCertificateId}`;
      
      // Log the issue text being sent
      console.log('Submitting revert with issue:', issueText);

      const response = await axios.put(url, { revertReason: issueText, selectedDocuments });

      if (response.status === 200) {
        console.log('Revert reason submitted successfully!');
        toast.success('Revert reason submitted successfully!');
        setIssueText(''); // Clear issue text after successful submission
        setSelectedDocuments([]); // Clear selected documents after successful submission
      }
    } catch (error) {
      console.error('Error reverting the certificate:', error);
      toast.error('Error submitting revert reason.');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDocumentChange = (selectedOptions) => {
    setSelectedDocuments(selectedOptions || []); // Handle case where no option is selected
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-4">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Assigned Certificates</h1>

      <input
        type="text"
        placeholder="Search by certificate name"
        className="mb-4 px-4 py-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table-auto border-collapse w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Certificate ID</th>
            <th className="border px-4 py-2">Certificate Name</th>
            <th className="border px-4 py-2">Uploaded Documents</th>
            <th className="border px-4 py-2">Payment Status</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Application Date</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((certificate) => (
              <tr key={certificate._id}>
                <td className="border px-4 py-2">{certificate._id}</td>
                <td className="border px-4 py-2">{certificate.certificateName}</td>
                <td className="border px-4 py-2">
                  {certificate.uploadedDocuments.map((doc, idx) => (
                    <div key={idx}>
                      {idx + 1}.{' '}
                      <a href={doc.path} target="_blank" rel="noopener noreferrer">
                        {doc.filename}
                      </a>
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">{certificate.paymentStatus}</td>
                <td className="border px-4 py-2">
                  <select
                    value={certificate.status}
                    onChange={(e) => handleStatusChange(certificate._id, e.target.value)}
                    className="border p-2 rounded-md"
                    disabled={updating}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  {new Date(certificate.applicationDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleRevertClick(certificate._id)}
                  >
                    Revert
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border px-4 py-2 text-center">
                No certificates found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Revert Application</h2>
            <textarea
              placeholder="Describe the issue with the certificate"
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              className="w-full p-2 border mb-4"
              rows="4"
            ></textarea>

            <Select
              options={documentOptions}
              value={selectedDocuments}
              onChange={handleDocumentChange}
              className="w-full"
              placeholder="Select Documents"
              isClearable
              isMulti
            />

            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleRevertSubmit}
              >
                Submit Revert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedTaskPage;
