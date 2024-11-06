import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-8 sm:space-y-0">
          {/* Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li className="hover:underline">
                <a href="/about">About Us</a>
              </li>
              <li className="hover:underline">
                <a href="/services">Services</a>
              </li>
              <li className="hover:underline">
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li className="hover:underline">
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Certificate Services Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Certificate Services</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2">
                <li className="hover:underline">
                  <a href="/birth-certificate">Birth Certificate</a>
                </li>
                <li className="hover:underline">
                  <a href="/death-certificate">Death Certificate</a>
                </li>
                <li className="hover:underline">
                  <a href="/income-certificate">Income Certificate</a>
                </li>
                <li className="hover:underline">
                  <a href="/residence-certificate">Residence Certificate</a>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="hover:underline">
                  <a href="/caste-certificate">Caste Certificate</a>
                </li>
                <li className="hover:underline">
                  <a href="/marriage-certificate">Marriage Certificate</a>
                </li>
                <li className="hover:underline">
                  <a href="/driving-license">Driving License</a>
                </li>
                <li className="hover:underline">
                  <a href="/passport">Passport Services</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              1234, Some Street, Pune, Maharashtra, India
            </p>
            <p className="text-sm">Phone: +91 9876543210</p>
            <p className="text-sm">Email: info@example.com</p>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://via.placeholder.com/24x24?text=F"
                  alt="Facebook"
                />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://via.placeholder.com/24x24?text=T"
                  alt="Twitter"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://via.placeholder.com/24x24?text=I"
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            Copyright &#169; {new Date().getFullYear()} Your Company Name, All
            Rights Reserved.
          </p>
          <p className="text-sm">
            Best viewed on Chrome, Firefox, or Safari.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
