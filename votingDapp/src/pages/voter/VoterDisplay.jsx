import React, { useEffect, useState, useContext } from 'react';
import { Web3context } from '../../context/web3Context';
import { useNavigate } from 'react-router-dom';

const VoterDisplay = () => {
  const { web3State } = useContext(Web3context);
  const { contractInstance } = web3State;
  const [voterList, setVoterList] = useState([]);
  const token = localStorage.getItem('token');
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) navigateTo('/');
  }, [token]);

  useEffect(() => {
    async function displayVoter() {
      const voterArray = await contractInstance.voterList();
      console.log("voterlist");
      setVoterList(voterArray);
    }
    contractInstance && displayVoter();
  }, [contractInstance]);

  return (
    <div className="min-h-screen bg-black text-white p-8  flex flex-col justify-center mt-6 ">
      <h2 className="text-4xl font-bold text-red-600 mb-12 text-center">Voter List</h2>
      {voterList.length > 0 ? (
        <div className="grid gap-8 grid-cols-3">
          {voterList.map((voter) => (
            <div key={voter.voterId} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-red-500 mb-2">{voter.name}</h3>
              <p className="text-gray-400 mb-2">Age: {parseInt(voter.age)}</p>
              <p className="text-gray-400 mb-2">Address: {voter.voterAddress}</p>
              <img
                src={`http://localhost:3000/votingSystem/VoterImages/${voter.voterAddress}.jpg`}
                alt={voter.name}
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
          ))}
        </div>
      ) : (
        <h4 className="text-center font-extrabold text-gray-500 text-xl">No voter is registered</h4>
      )}
    </div>
  );
};

export default VoterDisplay;
