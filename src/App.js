
import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Import the routes
import { PopModelContext } from "./Store/PopModelContext";
import PopModel from "./Component/Model/PopModel";
// import Footer from "./Component/Footer/Footer";
// import Navbar from "./Component/Navbar/Navbar";

function App() {
  const{popModel}=useContext(PopModelContext);
  return (
    <>
     
     {popModel && <PopModel/>}
     {/* <Navbar/> */}
        <div >
          <Router>
            <AppRoutes /> {/* Render the routes here */}
          </Router>
        </div>
      {/* <Footer/> */}
    </>
  );
}

// hello this is new
export default App;