import React, { useRef } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const TokenBuy = ({ contractIntance }) => {
const TokenAmountRef = useRef();

  // const buyToken = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const tokenValue = TokenAmountRef.current.value;
  //     const TokenValueWei = ethers.parseEther(tokenValue);
  //     const tokenPrice = await contractIntance.calculateTokenPrice();
  //     // const totalAmount = TokenValueWei*tokenPrice;
  //     const totalAmount = TokenValueWei.mul(tokenPrice).div(ethers.parseUnits("1", 18));
  //     // const tx = await contractIntance.buyGLDToken(TokenValueWei,{value:totalAmount});
  //     // const receipt = await tx.wait();
  //     // console.log("Transaction Successful", receipt);
  //     console.log(totalAmount);
  //   } catch (error) {
  //       toast.error("No Taken is available to buy")
  //   }
  // };

  const buyToken = async (e) => {
    e.preventDefault();
    try {
      const tokenAmount = TokenAmountRef.current.value;
      const tokenAmountWei = ethers.parseEther(tokenAmount);
      await contractIntance.calculateTokenPrice();
      const tokenPrice = await contractIntance.tokenPrice();
      const totalAmount = TokenValueWei*(tokenPrice)/(ethers.parseUnits("1", 18));
      const tx = await contractIntance.buyGLDToken(TokenValueWei, { value: totalAmount });
      const receipt = await tx.wait();
    } catch (error) {
        console.error("Error encountered:", error);
        toast.error("Something went wrong while Buying token");
        console.log("this can happen sometimes make sure your token price is getting updated there is a function in token marketPlace contract named `adjustTokenPriceBasedOnDemand` i was running this function with the help of chainLink automation which call this function after certain period of time make sure you also do the same");
    }
};


  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Buy Tokens</h2>
      <form onSubmit={buyToken} className="bg-gray-900 p-8 rounded-lg  text-white w-full max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-300">Token Amount to Buy :</label>
          <input type="text" ref={TokenAmountRef}
          placeholder='Enter Amount of Token to Buy'
           className="mt-1 p-2 w-full bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <button type="submit" className="bg-green-500 mt-6 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 w-full">Buy Token</button>
      </form>
    </div>
  );
};

export default TokenBuy;
// This is step 20
