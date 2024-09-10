import React, { useRef } from 'react'
import { useContext } from 'react'
import { Web3context } from '../../../context/web3Context'
import toast from 'react-hot-toast';

const VotingStartFrom = () => {
  const {web3State} = useContext(Web3context);
  const {contractInstance} = web3State
    const startRef = useRef()
    const endRef = useRef();


    // const timeInSecond = (time)=>{
    //   const date = new Date(time);
    //   return Math.floor(date.getTime()/1000);
    // }
    function convertToUnix(time) {
      const date = new Date(time); // Convert to a Date object
      const unixTimestamp = Math.floor(date.getTime() / 1000); // Convert to Unix timestamp (in seconds)
      return unixTimestamp;
    }
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
          const start = startRef.current.value;
          const end = startRef.current.value;

          const startTime = convertToUnix(start);
          const endTime = convertToUnix(end);
          const tx = await contractInstance.voteTime(startTime,endTime);
          const response  = tx.wait();
          toast.success("voting started")
          
        } catch (error) {
            toast.error("errro in starting Voting");
            console.log(error.message);
        }
    }
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Select Time</h2>
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg  text-white w-full max-w-lg">
        <label className="block text-white mb-2">Vote Start Time:</label>
        <input
          type="datetime-local"
          ref={startRef}
          className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <label className="block text-white mb-2">Vote End Time:</label>
        <input
          type="datetime-local"
          ref={endRef}
         className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <br />  
        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:text-green-300 mt-6   hover:bg-red-700 rounded-lg text-white font-semibold text-lg transition duration-200"
        >
          Start Voting
        </button>
      </form>
    </div>
  );
};

export default VotingStartFrom;

// //This is step 14 facing problem

  