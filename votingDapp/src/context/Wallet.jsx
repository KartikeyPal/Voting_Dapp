import React, { useEffect } from 'react';
import { Web3context } from './web3Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Wallet = () => {
  const navigateTo = useNavigate();
  const { handleWallet, web3State } = useContext(Web3context);
  const { selectedAccount } = web3State;

  useEffect(() => {
    if (selectedAccount) {
      navigateTo('./Candidate-Register');
    }
  }, [selectedAccount, navigateTo]);

  return (
    <div className='min-h-screen bg-gray-950 flex flex-col justify-between'>
      {/* Header Section */}
      <div className='text-center mt-16'>
        <h2 className="text-5xl font-bold text-blue-500">Welcome to Decentralized Voting DApp</h2>
        <p className='mt-4 text-gray-300 text-lg'>A secure and transparent voting system powered by blockchain technology.</p>
        <p className="mt-2 text-gray-300">Make your vote count, securely and privately.</p>
      </div>

      {/* Connect Wallet Section */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
          onClick={handleWallet}
        >
          Connect MetaMask
        </button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 text-center mt-16">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-500">Transparency</h2>
          <p className="mt-4 text-gray-600">All votes are recorded on the blockchain for full transparency.</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-500">Privacy</h2>
          <p className="mt-4 text-gray-600">Vote securely ensuring privacy.</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-500">Decentralization</h2>
          <p className="mt-4 text-gray-600">No central authority, fully decentralized on Ethereum.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-6">
        Ensure you have MetaMask installed in your browser to connect your wallet.
      </footer>
    </div>
  );
};

export default Wallet;
