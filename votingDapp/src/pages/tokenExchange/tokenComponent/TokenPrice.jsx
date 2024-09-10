import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TokenPrice = ({ contractIntance }) => {
  const [tokenPrice, setTokenPrice] = useState(null);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      const tokenWeiPrice = await contractIntance.tokenPrice();
      const tokenEthPrice = ethers.formatEther(tokenWeiPrice);
      setTokenPrice(tokenEthPrice);
    };
    contractIntance && fetchTokenPrice();
  }, [contractIntance]);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Token Price</h2>
      <p className="text-lg font-bold text-center">{tokenPrice !== null ? `${tokenPrice} ETH` : 'Loading...'}</p>
    </div>
  );
};

export default TokenPrice;
// // This is step 21

