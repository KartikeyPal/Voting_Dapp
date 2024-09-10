

import React, { useEffect, useState,useContext } from 'react'
import { Web3context } from '../../../context/web3Context'
import { ethers } from 'ethers'
const TokenBalance = ({ erc20Instance }) => {
    const {web3State}  = useContext(Web3context);
    const {selectedAccount} = web3State;
    const [balance,setBalance]  = useState();

    useEffect(()=>{
        const fetchTokenBalance = async ()=>{
          try {
            let Tokenbalance = await erc20Instance.balanceOf(selectedAccount);
            Tokenbalance= ethers.formatEther(Tokenbalance);
            setBalance(Tokenbalance);
          } catch (error) {
            console.log(error.message);
          }
        }
          erc20Instance && fetchTokenBalance();
    },[selectedAccount,erc20Instance]);
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Your Token Balance</h2>
      <p className="text-lg font-bold text-center">{balance !== null ? `${balance} ETH` : 'Loading...'}</p>
    </div>
  );
};

export default TokenBalance;

// this is step 19

// not working properly  mis behaving
// function name is correct
// works fine wihen the address 
// but does not working when i visit it for the first time every time i caonnect my wallet
// wallet is properly ocnnected

// issue is solve the issue was that it was taking for the erc20 instance to be made and before that it was calling the function