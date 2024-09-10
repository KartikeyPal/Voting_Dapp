import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Web3context } from '../../../context/web3Context';
import toast from 'react-hot-toast';

const VotingStatus = () => {
  const { web3State } = useContext(Web3context);
  const { contractInstance } = web3State;
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    const handleClick = async () => {
      try {
        let votingStatus = await contractInstance.votingStatus();
        votingStatus = votingStatus.toString();
        if (votingStatus === '0') setCurrentStatus('Not started');
        if (votingStatus === '1') setCurrentStatus('In progress');
        if (votingStatus === '2') setCurrentStatus('Voting Ended');
      } catch (error) {
        toast.error('Error fetching voting status');
        console.log(error.message);
      }
    };
    contractInstance && handleClick();
  }, [contractInstance]);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
        <h2 className="text-xl font-bold mb-4 text-green-400">
        Voting: {currentStatus}
      </h2>
    </div>
  );
};

export default VotingStatus;

// //step 15
