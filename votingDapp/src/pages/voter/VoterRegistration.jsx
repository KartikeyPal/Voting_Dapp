import React, { useState, useEffect, useContext, useRef } from 'react';
import { Web3context } from '../../context/web3Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VoterRegistration = () => {
  const { web3State } = useContext(Web3context);
  const { contractInstance } = web3State;
  const [file, setFile] = useState("");
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();

  const token = localStorage.getItem('token');
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) navigateTo('/');
  }, [token, navigateTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;

      if (age < 18) {
        toast.error("Below 18 are not eligible");
        return;
      }

      if (!name || !age || !gender || file === "") {
        toast.error("All fields are required");
        return;
      }

      const uploadSuccess = await handleFileUpload();
      if (!uploadSuccess) {
        toast.error("File upload failed");
        return;
      }

      const tx = await contractInstance.voterRegister(name, age, gender);
      const response = await tx.wait();
      console.log("Voter registration successful", response);

      nameRef.current.value = "";
      ageRef.current.value = "";
      genderRef.current.value = "";
      setFile("");
      toast.success("Registration successful");
    } catch (error) {
      if (error.message.includes("Voter Already Registered")) {
        toast.error("Voter already registered");
      } else {
        toast.error("Voter registration failed");
      }
    }
  };

  // Uploading image to the backend
  const handleFileUpload = async () => {
    if (!file) {
      console.log('No file selected. Please select a file first.');
      return false;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'token': token,
        },
      };
      const response = await axios.post(`http://localhost:3000/api/v1/upload/postVoterImage`, formData, config);
      console.log("File uploaded successfully", response.data);
      return true;
    } catch (error) {
      console.error('Error uploading file:', error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center mt-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg  text-white w-full max-w-lg">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Voter Registration</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Voter Name</label>
          <input
            type="text"
            ref={nameRef}
            className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Voter Age</label>
          <input
            type="number"
            ref={ageRef}
            min="18"
            className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Voter Gender</label>
          <select
            ref={genderRef}
            className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300">Upload Voter Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 w-full text-gray-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:text-green-300   hover:bg-red-700 rounded-lg text-white font-semibold text-lg transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default VoterRegistration;
