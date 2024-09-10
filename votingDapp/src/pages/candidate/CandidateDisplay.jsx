import React, { useEffect, useState, useContext } from 'react';
import { Web3context } from '../../context/web3Context';
import { useNavigate } from 'react-router-dom';

const CandidateDisplay = () => {
  const { web3State } = useContext(Web3context);
  const { contractInstance } = web3State;
  const [candidateList, setCandidateList] = useState([]);
  const token = localStorage.getItem('token');
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) navigateTo('/');
  }, [token]);

  useEffect(() => {
    async function displayCandidate() {
      const candidateArray = await contractInstance.candidateList();
      setCandidateList(candidateArray);
      console.log(candidateArray[1].candidateId)
    }
    contractInstance && displayCandidate();
  }, [contractInstance]);

  return (
    <div className="min-h-screen bg-black text-white p-8  flex flex-col justify-center ">
      <h2 className="text-4xl font-bold text-red-600 mb-12 text-center">Candidate List</h2>
      {candidateList.length > 0 ? (
        <div className="grid gap-8 grid-cols-3">
          {candidateList.map((candidate) => (
            <div key={candidate.candidateId} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-red-500 mb-2">{candidate.name}</h3>
              <p className="text-gray-400 mb-2">Age: {String(candidate.age)}</p>
              <p className="text-gray-400 mb-2">Party: {candidate.party}</p>
              <p className="text-gray-400 mb-2">Votes: {String(candidate.votes)}</p>
              <p className="text-gray-400 mb-2">Address: {candidate.candidateAddress}</p>
              <p className="text-gray-400 mb-2">Candidate ID: {parseInt(candidate.candidateId)}</p>
              <img 
                src={`http://localhost:3000/votingSystem/CandidateImages/${candidate.candidateAddress}.jpg`} 
                alt={candidate.name}
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
          ))}
        </div>
      ) : (
        <h4 className="text-center font-extrabold text-gray-500 text-xl">No candidate is registered</h4>
      )}
    </div>
  );
};

export default CandidateDisplay;
