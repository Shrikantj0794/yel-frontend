import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from '../firebase/setup';
import { auth } from "../firebase/setup";
import SummaryApi from "../common/Apis";
import { Usercontext } from "../Store/UserContext";
import loginUp from "../Assets/loginup.jpg";

const Login = () => {
  const { user, loading, error, fetchUserData } = useContext(Usercontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginWithOtp, setLoginWithOtp] = useState(false); // Toggle for email vs OTP login
  const [district, setDistrict] = useState("Pune"); // Default district
  const [state, setState] = useState("Maharashtra"); // Default state
  // const [captchaValid, setCaptchaValid] = useState(false);
  const navigate = useNavigate();

  if (!auth) {
    console.error("Firebase auth is not initialized.");
    return;
  }

  const configureCaptcha = () => {
    if (!window.recaptchaVerifier) {
      // Initialize ReCAPTCHA widget
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container", // This ID should match the div in your component for reCAPTCHA
        {
          size: "normal", // Available options: 'invisible', 'normal', 'compact'
        }
      );
      window.recaptchaVerifier.render(); // Render the reCAPTCHA widget
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error("Please enter a phone number", { position: "top-right" });
      return;
    }
    if (!phoneNumber.startsWith("+")) {
      toast.error(
        "Please include country code in phone number (e.g., +91 for India)",
        { position: "top-right" }
      );
      return;
    }
    try {
      configureCaptcha();
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
      toast.success("OTP sent to your phone number", { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP", { position: "top-right" });
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const token = result.user.accessToken;
      localStorage.setItem("token", token);

      toast.success("Login successful!", { position: "top-right" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Invalid OTP. Please try again.", { position: "top-right" });
    }
  };

  // Email and Password Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: SummaryApi.signIn.url, // Use URL from the API configuration
        method: SummaryApi.signIn.method, // Use method from the API configuration
        data: {
          email,
          password,
          district,
          state,
        },
      });
      if (response.data.jwt_token) {
        localStorage.setItem("token", response.data.jwt_token);

        toast.success("Login successfully!", { position: "top-right" });

        setTimeout(() => {
          console.log("Navigating to dashboard");
          const token = localStorage.getItem("token");

          fetchUserData(token);
          navigate("/dashbord");
        }, 500);
      } else {
        toast.error("Failed to receive token", { position: "top-right" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response ? error.response.data : "An error occurred during login",
        { position: "top-right" }
      );
    }
  };

  const districts = [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ];

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];

  return (
    <>
      <div className="h-[70vh] mt-5 flex items-center justify-center">
        <div className="max-w-sm w-full">
          <img className="h-28 object-cover w-full " src={loginUp} alt="" />
          <div className="bg-white rounded-lg shadow-lg p-5">
            <h2 className="text-lg font-semibold text-center mb-3">
              Login into YEL
            </h2>

            <div className="mb-2 flex justify-center space-x-2">
              <button
                className={`px-3 py-1 rounded-md ${!loginWithOtp ? "bg-[#075985] text-white" : "bg-gray-300"}`}
                onClick={() => setLoginWithOtp(false)}
              >
                Email Login
              </button>
              <button
                className={`px-3 py-1 rounded-md ${loginWithOtp ? "bg-[#075985] text-white" : "bg-gray-300"}`}
                onClick={() => setLoginWithOtp(true)}
              >
                Phone Login
              </button>
            </div>

            <form onSubmit={loginWithOtp ? (isOtpSent ? verifyOtp : sendOtp) : handleLogin}>
              {!loginWithOtp ? (
                <>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 px-3 mb-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-9 px-3 mb-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    required
                  />
                </>
              ) : (
                <>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-9 px-3 mb-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    required
                  />
                  {isOtpSent && (
                    <input
                      type="text"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full h-9 px-3 mb-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                      required
                    />
                  )}
                  <div id="recaptcha-container"></div>
                </>
              )}

              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full h-9 px-3 mb-2 text-sm font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                {states.map((stateItem) => (
                  <option key={stateItem} value={stateItem}>
                    {stateItem}
                  </option>
                ))}
              </select>

              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full h-9 px-3 mb-4 text-sm font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                {districts.map((districtItem) => (
                  <option key={districtItem} value={districtItem}>
                    {districtItem}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full py-2 bg-[#075985] text-white rounded-md text-sm font-semibold hover:bg-[#0C4A6E]"
              >
                {loginWithOtp ? (isOtpSent ? "Verify OTP" : "Send OTP") : "Login"}
              </button>
              <Link to="/signup" className="text-sm text-blue-500 hover:underline block text-center mt-2">
                Don't have an account? Sign up here.
              </Link>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;