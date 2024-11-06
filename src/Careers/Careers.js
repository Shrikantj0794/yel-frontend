import React from 'react';
import UserNavbar from '../Component/Navbar/UserNavbar';
// import UserNavbar from "../Component/Navbar/UserNavbar";
import Navbar from '../Component/Navbar/Navbar';


const jobOpenings = [
  {
    title: 'Documentation Specialist',
    description: 'Focuses on completing, submitting, and tracking government forms and applications, ensuring that all requirements are met and deadlines are observed.',
    applyLink: 'https://forms.gle/example1' // Replace with your Google Form link
  },
  {
    title: 'Compliance Officer',
    description: 'Ensures that all governmental forms and filings are accurate and completed in accordance with regulations and compliance standards.',
    applyLink: 'https://forms.gle/example2' // Replace with your Google Form link
  },
  {
    title: 'Government Services Coordinator/Assistant',
    description: 'Focuses on completing, submitting, and tracking government forms and applications, ensuring that all requirements are met and deadlines are observed.',
    applyLink: 'https://forms.gle/example3' // Replace with your Google Form link
  },
  // Add more job openings as needed
];


const Careers = () => {
  const token =localStorage.getItem("token")
  return (
    <div className="fixed top-0 left-0 w-full z-10">
      {token ?
       <UserNavbar /> : <Navbar/>
      }
         
         

    <div className="p-6 bg-gray-100 min-h-screen">
        
      <h1 className="text-3xl font-semibold text-center mb-8">Careers</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {jobOpenings.map((job, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default Careers;