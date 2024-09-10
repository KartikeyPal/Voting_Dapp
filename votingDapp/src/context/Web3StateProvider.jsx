import React, { useEffect, useState } from 'react';
import { getWeb3State } from '../utils/web3States';
import { Web3context } from './web3Context';    
import toast from 'react-hot-toast';
const Web3StateProvider = ({ children }) => {
    //Step 3
    // Initialize state as an objest
    const [web3State, setWeb3State] = useState({
        contractInstance: null,
        selectedAccount: null,
        chainId: null,
        signer: null,
    });
  //fetching data from getWeb3State
  const handleWallet = async () => {
        try {
            const { contractInstance, selectedAccount, chainId, signer } = await getWeb3State(); 
            setWeb3State({ contractInstance, selectedAccount, chainId, signer });
            toast.success("Wallet Connected")
        } catch (error) {
            console.error("Wallet connection failed", error.message);
        }
    }


    // This is step 3 
    // Detecting if a user has changed account or the blockchain network
    useEffect(() => {
        window.ethereum.on("accountsChanged", (accounts) => {
            handleAccountChange(accounts, setWeb3State);
        });
        window.ethereum.on("chainChanged", (chainId) => {
            handleChainChange(chainId, setWeb3State);
        });

        // Cleanup on component unmount
        return () => {
            window.ethereum.removeListener("accountsChanged",handleAccountChange);
            window.ethereum.removeListener("chainChanged",handleChainChange);
        };
    }, []);

    const handleAccountChange = (accounts, setWeb3State) => {
        // if (accounts.length > 0) {
        //     setWeb3State(prevState => ({
        //         ...prevState,
        //         selectedAccount: accounts[0]
        //     }));
        // } else {
        //     console.error("No account found");
        // }

        handleWallet()
    };

    const handleChainChange = (chainId, setWeb3State) => {
        chainId = parseInt(chainId,16);
        setWeb3State(prevState => ({
            ...prevState,
            chainId: chainId
        }));
    };

    return (
        <div>
            <Web3context.Provider value={{web3State,handleWallet}}>
                {children}
            </Web3context.Provider>
        </div>
    );
}

export default Web3StateProvider;

//Tested but need fix
//fix account_change function not working properly
//