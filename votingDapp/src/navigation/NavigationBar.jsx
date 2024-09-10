import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Web3context } from '../context/web3Context';

const NavigationBar = () => {
  const { web3State } = useContext(Web3context);
  const { selectedAccount } = web3State;

  return (
    <nav className="bg-black text-white py-3 fixed w-full top-0 z-20 shadow-md">
      {selectedAccount ? (
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Branding */}
          <div className="text-2xl font-bold text-red-600">
            DApp Voting
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-base items-center">
            <li>
              <Link to='/Candidate-Register' className="hover:text-red-500 transition duration-300">Candidate Register</Link>
            </li>
            <li>
              <Link to='/Candidate-List' className="hover:text-red-500 transition duration-300">Candidate List</Link>
            </li>
            <li>
              <Link to='/Voter-Register' className="hover:text-red-500 transition duration-300">Voter Register</Link>
            </li>
            <li>
              <Link to='/Voter-List' className="hover:text-red-500 transition duration-300">Voter List</Link>
            </li>
            <li>
              <Link to='/Election-Commission' className="hover:text-red-500 transition duration-300">Election Commission</Link>
            </li>
            <li>
              <Link to='/Token-Exchange' className="hover:text-red-500 transition duration-300">Token Exchange</Link>
            </li>
            <li>
              <Link to='/Vote-Here' className="hover:text-red-500 transition duration-300">Vote</Link>
            </li>
          </ul>

          {/* Wallet Address Badge */}
          <div className="bg-red-600 text-sm py-2 px-4 rounded-full shadow-lg">
            {selectedAccount.slice(0, 6)}...{selectedAccount.slice(-4)}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavigationBar;
