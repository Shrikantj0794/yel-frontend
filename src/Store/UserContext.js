import React, { createContext, useEffect, useState, useRef } from "react";
import SummaryApi from "../common/Apis";
import { toast } from "react-toastify";

export const Usercontext = createContext(null);

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tokenRef = useRef(localStorage.getItem("token")); // Track initial token

  // Function to fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem("token"); // Always get the latest token from localStorage
    if (!token) {
      setUser(null); // Clear user if no token
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Start loading when fetching data
      const response = await fetch(SummaryApi.profile.url, {
        method: SummaryApi.profile.method,
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON, but got something else.");
      }

      const userData = await response.json();
      setUser(userData);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      setError(error.message);
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false); // Ensure loading stops
    }
  };

  useEffect(() => {
    fetchUserData(); // Initial fetch on mount

    // Listen for token changes in localStorage
    const handleStorageChange = () => {
      if (tokenRef.current !== localStorage.getItem("token")) {
        tokenRef.current = localStorage.getItem("token");
        fetchUserData();
      }
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Cleanup event listener on unmount
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Usercontext.Provider value={{ user, loading, error, setUser, fetchUserData }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        props.children
      )}
      {error && <div>Error: {error}</div>}
    </Usercontext.Provider>
  );
};

export default UserContextProvider;