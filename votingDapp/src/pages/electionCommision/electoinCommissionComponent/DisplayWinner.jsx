import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import { Web3context } from '../../../context/web3Context'
import toast from 'react-hot-toast';
const DisplayWinner = () => {
  const {web3State} = useContext(Web3context);
  const {contractInstance} = web3State
    const [winner,setWinner] = useState("Not declared yet");
    useEffect(()=>{
        const displayWinner = async () =>{
          try {
            const ElectoinWinner = await contractInstance.winner();
            if(ElectoinWinner !="0x0000000000000000000000000000000000000000")
            setWinner(ElectoinWinner);
          } catch (error) {
            toast.error("error while fetching voting status");
            console.log(error.message); 
          }
        }
        contractInstance && displayWinner();
    },[contractInstance])

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
       <h2 className="text-xl font-bold mb-4 text-green-400">Winner: {winner}</h2>
    </div>
  );
};

export default DisplayWinner;


// // This is step 12