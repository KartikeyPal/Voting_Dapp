import React, { useContext } from 'react';
import { Web3context } from '../../../context/web3Context';
import toast from 'react-hot-toast';

const Emergency = () => {
  const { web3State } = useContext(Web3context);
  const { contractInstance } = web3State;

  const handleClick = async () => {
    try {
      const tx = await contractInstance.emergency();
      const response = tx.wait();
      toast.success('Emergency declared');
    } catch (error) {
      toast.error('Error in declaring emergency');
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md ">
    <button
      onClick={handleClick}
      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300 w-full"
    >
        Emergency Declare
      </button>
    </div>
  );
};

export default Emergency;


// // this is step 13
