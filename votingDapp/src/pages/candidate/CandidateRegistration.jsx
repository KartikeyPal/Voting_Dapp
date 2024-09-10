import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Web3context } from '../../context/web3Context';

const CandidateRegistration = () => {
  const { web3State } = useContext(Web3context);
  const { contractInstance } = web3State;
  const [file, setFile] = useState("");
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const partyRef = useRef();
  
  const token = localStorage.getItem('token');
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) navigateTo('/');
  }, [token]);

  const handleRegistration = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const gender = genderRef.current.value;
    const party = partyRef.current.value;

    // validation
    if (!name || !age || !gender || !party || file === "") {
      throw new Error("All input fields are required");
    }
    if (!await handleUpload()) {
      throw new Error("Please select a file to upload");
    }

    // Smart contract interaction
    const tx = await contractInstance.candidateRegister(name, party, age, gender);
    const response = await tx.wait();
    console.log(response);

    // Clear the form after successful submission
    nameRef.current.value = "";
    ageRef.current.value = "";
    genderRef.current.value = "";
    partyRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      console.log('No file selected');
      return false;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'token': token } };
      const response = await axios.post(`http://localhost:3000/api/v1/upload/postCandidateImage`, formData, config);
      console.log("File uploaded successfully", response.data);
      return true;
    } catch (error) {
      console.error('Error uploading file:', error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center mt-4">
      <form onSubmit={handleRegistration} className="bg-gray-900 p-8 rounded-lg  text-white w-full max-w-lg">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Candidate Registration</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Candidate Name</label>
          <input type="text" ref={nameRef} className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Candidate Age</label>
          <input type="text" ref={ageRef} className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Candidate Gender</label>
          <select ref={genderRef} className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Candidate Party</label>
          <input type="text" ref={partyRef} className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Upload Candidate Image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mt-1 w-full text-gray-200" />
        </div>

        <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold text-lg transition duration-200">
          Register
        </button>
      </form>
    </div>
  );
};

export default CandidateRegistration;
