
import React, { useRef } from 'react';
import { ethers } from 'ethers';

const TokenSell = ({ contractIntance, erc20Instance }) => {
  const TokenAmountRef = useRef();
  const approveTokenAmountRef = useRef();

  try {
    
  } catch (error) {
    
  }

    const sellToken = async (e)=>{
      e.preventDefault();   
        const TokenValueEth = TokenAmountRef.current.value;
        const TokenValueWei = ethers.parseEther(TokenValueEth,18);
        const tx = await contractIntance.sellGLDToken(TokenValueWei);
        const receipt =  tx.wait();
        console.log("transaction SuccessFull",receipt);
    }

    try {
      
    } catch (error) {
      
    }

  const approveToken = async (e)=>{
          e.preventDefault();   

          try {
            const TokenValueEth = approveTokenAmountRef.current.value;
            const TokenValueWei = ethers.parseEther(TokenValueEth,18);

            const tokenMarketPlace="0x7274A1a771363dcEA843CBAbF3b1089eCE1f0B67"
            const tx = await erc20Instance.approve(tokenMarketPlace,TokenValueWei);
            const receipt =  tx.wait();
            console.log("transaction SuccessFull",receipt);
            
          } catch (error) {
            toast.error("check Your console")
            console.log("this can happen sometimes make sure your token price is getting updated there is a function in token marketPlace contract named `adjustTokenPriceBasedOnDemand` i was running this function with the help of chainLink automation which call this function after certain period of time make sure you also do the same");
          }
        }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Sell Tokens</h2>
      <form onSubmit={sellToken} className="bg-gray-900 p-8 rounded-lg  text-white w-full max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-300">Token Amount to Sell (in ETH):</label>
          <input type="text" ref={TokenAmountRef} 
          placeholder='Enter Amount of Token to Sell'          
          className=" mt-5 p-2 rounded-md bg-gray-700 text-white w-full" />
        </div>
        <button type="submit" className="bg-red-600 mt-6 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 w-full">Sell Token</button>
      </form>
      <form onSubmit={approveToken} className="bg-gray-900 p-8 rounded-lg  text-white w-full max-w-lg mt-5">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Approve Tokens</h2>
        <div>
          <label className="block text-sm font-medium text-gray-300">Token Amount to Approve (in ETH):</label>
          <input type="text" ref={approveTokenAmountRef} 
          placeholder='Enter Amount of Token to Approve'
          className="p-2 mt-5 rounded-md bg-gray-700 text-white w-full" />
        </div>
        <button type="submit" className="bg-green-500 mt-6 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 w-full">Approve Token</button>
      </form>
    </div>
  );
};

export default TokenSell;
// This is step 22
