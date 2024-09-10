import React, { useContext, useEffect, useState } from 'react'
import { Web3context } from '../../context/web3Context'
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const VoterProfile = () => {
    const {web3State}  = useContext(Web3context);
    const {contractInstance} = web3State;
    const [profile,setProfile]  = useState();

    const token = localStorage.getItem('token');

    useEffect(() => {
      if (!token) navigateTo('/');
    }, [token]);  
    
    useEffect(()=>{
      const fetchingProfile  = async () =>{
          try {
            const Profile = await contractInstance.userProfile();
            setProfile(Profile);
          } catch (error) {
            toast.error("failed fetching voter Register");
          }

      }
      contractInstance && fetchingProfile();
    },[contractInstance]);


    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-green-400 text-2xl font-bold mb-6 text-center">Here is your Voting Profile</h2>
          {profile? (
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-2">{profile.name}</h3>
              <p className="text-gray-400 mb-2">Age: {parseInt(profile.age)}</p>
              <p className="text-gray-400 mb-2">Address: {profile.voterAddress}</p>
              <p className="text-gray-400 mb-2">Voter Id: {parseInt(profile.voterId)}</p>

              <img
                src={`http://localhost:3000/votingSystem/VoterImages/${profile.voterAddress}.jpg`}
                alt={profile.name}
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
          ) : (
            <p className="text-xl font-bold text-red-500 mb-2">You are not registered</p>
          )}
        </div>
      </div>
    );
}

export default VoterProfile