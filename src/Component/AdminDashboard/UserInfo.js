import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../../common/Apis";

const UserInfo = () => {
  const { userId } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false); // New state for updating status

  // List of status options available for admin
  const statusOptions = ["pending", "approved", "rejected"];

  useEffect(() => {
    const fetchUserDetails = async () => {
      const url = `${SummaryApi.users.url}/${userId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to handle status change
  const handleStatusChange = async (certificateId, newStatus) => {
    const url = `${SummaryApi.users.url}/${userId}/certificates/${certificateId}/status`;
    setUpdating(true); // Start updating
    try {
      // Make an API request to update the status in the backend
      const response = await axios.put(url, {
        status: newStatus,
      });

      if (response.status === 200) {
        // Update the user state with the new status after the API call
        setUser((prevUser) => ({
          ...prevUser,
          certificatesApplied: prevUser.certificatesApplied.map((cert) =>
            cert._id === certificateId ? { ...cert, status: newStatus } : cert
          ),
        }));
        console.log("Status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating certificate status:", error);
    } finally {
      setUpdating(false); // Stop updating
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-semibold">User Information</h1>

      {/* User Details Table */}
      <table className="table-auto border-collapse w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.role}</td>
          </tr>
        </tbody>
      </table>

      {/* Certificates Applied Table */}
      <h2 className="text-xl font-semibold mt-8">Certificates Applied</h2>
      {user.certificatesApplied.length > 0 ? (
        <table className="table-auto border-collapse w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Certificate ID</th>
              <th className="border px-4 py-2">Certificate Name</th>
              <th className="border px-4 py-2">Uploaded Documents</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Application Date</th>
            </tr>
          </thead>
          <tbody>
            {user.certificatesApplied.map((certificate) => (
              <tr key={certificate._id}>
                <td className="border px-4 py-2">{certificate._id}</td> {/* Certificate ID column */}
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
                  {/* Status dropdown for admin to change the status */}
                  <select
                    value={certificate.status}
                    onChange={(e) =>
                      handleStatusChange(certificate._id, e.target.value)
                    }
                    className="border p-2 rounded-md"
                    disabled={updating} // Disable dropdown while updating
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No certificates applied yet.</p>
      )}
    </div>
  );
};

export default UserInfo;
