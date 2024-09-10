import React, { useEffect,useContext } from 'react'
import {  } from 'react'
import { Web3context } from '../../../context/web3Context'
import toast from 'react-hot-toast';

const AnnounceResult = () => {
  const {web3State} = useContext(Web3context);
  const {contractInstance} = web3State

    const handleClick = async()=>{
      try {
        const tx = await contractInstance.result();
        const response = tx.wait();
        toast.success('result announced');  
        
      } catch (error) {
          toast.error("error in announceing result"); 
      }
    }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <button
        onClick={handleClick}

        className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300 w-full"
      >
        Announce Result
      </button>
    </div>
  );
};

export default AnnounceResult;

// // this is step 11