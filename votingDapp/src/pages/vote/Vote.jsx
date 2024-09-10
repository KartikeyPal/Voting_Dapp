import React, { useRef } from 'react'
import { useContext } from 'react'
import { Web3context } from '../../context/web3Context'; 
import toast from 'react-hot-toast';
import VoterProfile from './VoterProfile';
const Vote = () => {
    const {web3State} = useContext(Web3context);
    const {contractInstance} = web3State;

    const voterId = useRef();
    const candidateId = useRef();

    const handleSubmit  = async(e)=>{
    e.preventDefault();
        try {
            const currentVoterId = voterId.current.value;
            const currentCandidateId = candidateId.current.value;
            if(!currentCandidateId || !currentVoterId){
                toast.error("All fields are required")
            }
            const tx = await contractInstance.vote(currentVoterId,currentCandidateId);
            const response = tx.wait();
            toast.success("Voted successfully");
            
        } catch (error) {
            
        }
    }
  return (
    <div className="min-h-screen bg-black flex flex-row  justify-evenly items-center mt-4">
      <form onSubmit={handleSubmit}  className="bg-gray-900 p-8 rounded-lg  text-white w-full max-w-lg">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Vote Here</h2>
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Enter your Voter Id</label>
          <input type="number" ref={voterId}
          className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
      </div>
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Enter the Candidate Id</label>
          <input type="number" ref={candidateId} 
          className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />  
      </div>

      <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:text-green-300   hover:bg-red-700 rounded-lg text-white font-semibold text-lg transition duration-200"
        >Submit Your Vote</button>
      </form>

        <VoterProfile/>
    </div>
  )
}

export default Vote;
