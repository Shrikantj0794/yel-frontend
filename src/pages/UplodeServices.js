import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Fix import for jwt-decode
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify styles
import SummaryApi from "../common/Apis"; // Assuming you have this in place

const UploadServices = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { certificatename } = location.state || {}; // Fallback in case state is undefined
  const [certificateName, setCertificateName] = useState(certificatename || ""); // Fallback for certificate name
  const [proofOfIdentity, setProofOfIdentity] = useState([""]);
  const [proofOfAddress, setProofOfAddress] = useState([""]);
  const [availableIdentityDocs, setAvailableIdentityDocs] = useState([]);
  const [availableAddressDocs, setAvailableAddressDocs] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [payAmount, setAmount] = useState(0);

  // New States for form
  const [formFor, setFormFor] = useState("self"); // Dropdown state
  const [personName, setPersonName] = useState(""); // Name field state
  const [mobileNumber, setMobileNumber] = useState(""); // Mobile number state

  // Extract user ID from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken._id); // Set the user ID from the decoded token
      // console.log(decodedToken._id);
    }
  }, []);

  // Fetch proof of identity and address documents from backend on component load
  useEffect(() => {
    const url = `${SummaryApi.documents.url}/${certificateName}`;
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(url);
        const { proofOfIdentity, proofOfAddress, amount } = response.data; // Adjust based on response structure
        setAmount(amount);
        setAvailableIdentityDocs(proofOfIdentity);
        setAvailableAddressDocs(proofOfAddress);
      } catch (error) {
        console.error("Error fetching documents:",error);
      }
    };
    
    if (certificateName) {
      fetchDocuments();
    }
  }, [certificateName]);

  // Handle adding more inputs for identity/address proof
  const handleAddField = (fieldType) => {
    if (fieldType === "identity") {
      setProofOfIdentity([...proofOfIdentity, ""]);
    } else if (fieldType === "address") {
      setProofOfAddress([...proofOfAddress, ""]);
    }
  };

  // Handle file upload
  const handleFileUpload = (e, fieldType, index) => {
    const file = e.target.files[0];
    if (fieldType === "identity") {
      const updatedFiles = [...proofOfIdentity];
      updatedFiles[index] = file;
      setProofOfIdentity(updatedFiles);
    } else if (fieldType === "address") {
      const updatedFiles = [...proofOfAddress];
      updatedFiles[index] = file;
      setProofOfAddress(updatedFiles);
    }
  };

  // Handle Payment
  const handlePayment = async () => {
    try {
      const url = SummaryApi.payment.url;
      const paymentResponse = await axios.post(url, {
        amount: payAmount,
      });

      const { amount, id: order_id, currency } = paymentResponse.data;

      if (typeof window.Razorpay === "undefined") {
        console.error("Razorpay SDK not loaded");
        toast.error("Payment gateway not available");
        return;
      }

      const options = {
        key: "rzp_test_U4XuiM2cjeWzma",
        amount: amount,
        currency: currency,
        name: "Certificate Service",
        description: "Payment for certificate",
        order_id: order_id,
        handler: async (response) => {
          try {
            const paymentId = response.razorpay_payment_id;
            console.log("Payment successful:", paymentId);
            await handleSubmit();
          } catch (error) {
            console.error("Error during payment handling:", error);
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("Error initiating payment");
    }
  };

  // Handle form submission (called after successful payment)
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("certificateName", certificateName);
    formData.append("formFor", formFor);
    formData.append("name", personName);
    formData.append("phoneNo", mobileNumber);

    // Append proof of identity files
    proofOfIdentity.forEach((file) => {
      if (file) {
        formData.append("proofOfIdentity", file);
      }
    });

    // Append proof of address files
    proofOfAddress.forEach((file) => {
      if (file) {
        formData.append("proofOfAddress", file);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const url = `${SummaryApi.users.url}/${userId}/certificates`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Certificate details uploaded successfully");

      setTimeout(() => {
        navigate("/userdashboard");
      }, 5000);
    } catch (error) {
      toast.error("Error uploading certificate details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/userdashboard/serviceslist");
  };

  return (
    <>
      <div className="flex">
        <div className="ml-14 mt-5">
          <button
            className="bg-blue-700 text-white rounded-lg p-2 m-1 border"
            onClick={handleClick}
          >
            Go to Services List
          </button>
        </div>
        <div className="w-[40%] mx-auto p-8 bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Certificate Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certificate Name
              </label>
              <input
                type="text"
                value={certificateName}
                onChange={(e) => setCertificateName(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md"
                placeholder="Enter certificate name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Filling Form For
              </label>
              <select
                value={formFor}
                onChange={(e) => setFormFor(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md"
              >
                <option value="self">Self</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="wife">Wife</option>
              </select>
            </div>

            {formFor !== "self" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    className="mt-1 p-2 block w-full border rounded-md"
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="mt-1 p-2 block w-full border rounded-md"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Proof of Identity
              </label>
              {proofOfIdentity.map((_, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Proof of Identity
                  </label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option value="">Select Document</option>
                    {availableIdentityDocs.map((doc, idx) => (
                      <option key={idx} value={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    className="mt-1 block w-full border rounded-md"
                    onChange={(e) => handleFileUpload(e, "identity", index)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="bg-blue-700 text-white rounded-lg p-2"
                onClick={() => handleAddField("identity")}
              >
                Add More Identity Proof
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Proof of Address
              </label>
              {proofOfAddress.map((_, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Proof of Address
                  </label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option value="">Select Document</option>
                    {availableAddressDocs.map((doc, idx) => (
                      <option key={idx} value={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    className="mt-1 block w-full border rounded-md"
                    onChange={(e) => handleFileUpload(e, "address", index)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="bg-blue-700 text-white rounded-lg p-2"
                onClick={() => handleAddField("address")}
              >
                Add More Address Proof
              </button>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              className="bg-blue-700 text-white rounded-lg p-2"
            >
              {loading ? "Processing..." : "Submit Details and Pay"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadServices;
