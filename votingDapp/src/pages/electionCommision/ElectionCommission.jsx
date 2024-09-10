import React, { useEffect } from 'react';
import VotingStartFrom from './electoinCommissionComponent/VotingStartFrom';
import AnnounceResult from './electoinCommissionComponent/AnnounceResult';
import Emergency from './electoinCommissionComponent/Emergency';
import VotingStatus from './electoinCommissionComponent/VotingStatus';
import DisplayWinner from './electoinCommissionComponent/DisplayWinner';
import { useNavigate } from 'react-router-dom';

const ElectionCommission = () => {
  const token = localStorage.getItem('token');
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) navigateTo('/');
  }, [token]);

  return (
    <div className="bg-black text-white min-h-screen p-6 mt-14  ">
      <div className="container mx-auto max-w-4xl space-y-6">
        <VotingStatus />
        <DisplayWinner />
        <VotingStartFrom />
        <AnnounceResult />
        <Emergency />
      </div>
    </div>  
  );
};

export default ElectionCommission;

// // step 16
