import React, { useState, useEffect } from 'react';
import TokenBuy from './tokenComponent/TokenBuy';
import TokenSell from './tokenComponent/TokenSell';
import TokenBalance from './tokenComponent/TokenBalance';
import TokenPrice from './tokenComponent/TokenPrice';
import tokenabi from '../../contract/tokenabi.json';
import { ethers } from 'ethers';
import { useContext } from 'react';
import { Web3context } from '../../context/web3Context';
import erc20abi from '../../contract/erc20abi.json';

const Token = () => {
  const [tokenInstance, setTokenInstance] = useState(null);
  const [erc20Instance, setErc20Instance] = useState(null);
  const { web3State } = useContext(Web3context);
  const { signer } = web3State;

  useEffect(() => {
    const erc20 = async () => {
      const TokenContractAddress = "0x0654f24bB3264Dd93EFBCaD97f45c4449d1ECF88";
      const erc20contractInstance = new ethers.Contract(TokenContractAddress, erc20abi, signer);
      setErc20Instance(erc20contractInstance);
    };
    signer && erc20();
  }, [signer]);

  useEffect(() => {
    const tokenExchange = async () => {
      const tokenContract = "0xdbbD2317F93a51Ca060B26f377d7f995B65cd7b7";
      const tokenExchangeInstance = new ethers.Contract(tokenContract, tokenabi, signer);
      setTokenInstance(tokenExchangeInstance);
    };
    signer && tokenExchange();
  }, [signer]);

  return (
    <div className="bg-black text-white min-h-screen p-6 mt-14  ">
      <h2 className="text-5xl font-bold text-red-600 mb-9 text-center mt-4">Token Marketplace</h2>
      <div className="container mx-auto max-w-4xl space-y-6 scroll-smooth">
        <TokenBalance erc20Instance={erc20Instance} />
        <TokenPrice contractIntance={tokenInstance} />
        <TokenBuy contractIntance={tokenInstance} />
        <TokenSell erc20Instance={erc20Instance} contractIntance={tokenInstance} />
      </div>
    </div>
  );
};

export default Token;
