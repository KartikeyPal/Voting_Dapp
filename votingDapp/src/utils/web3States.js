import {ethers} from 'ethers'
import abi from "../contract/abi.json"
import axios from 'axios';
import toast from 'react-hot-toast';
export const getWeb3State =async ()=>{
    let [contractInstance,selectedAccount,chainId] = [null,null,null];
    try {
        
        if (!window.ethereum) {
            throw new Error("Metamask is not installed");
        }
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        selectedAccount =accounts[0];
        let chainIdHex = await window.ethereum.request({
            method: 'eth_chainId'
        })
        chainId = parseInt(chainIdHex,16);//converting hexa to integer  
    
        //used for reading operation
        const provider = new ethers.BrowserProvider(window.ethereum)
        //used for writing operation
        const signer = await provider.getSigner();

        // doing step 17 from line 26 to 31
        const message = "You accept the terms and conditions of voting Dapp";
        const signature  = await signer.signMessage(message);
        const dataSignature = {signature};
        const res = await axios.post(`http://localhost:3000/api/v1/authentication?accountAddress=${selectedAccount}`,dataSignature);
        localStorage.setItem('token',res.data.token);
        //steps of step17 is finished here


        //make contract instance
        //the contract instance will help us to contact our smart contract that is deployed on a blockchain
        const contractAddress = "0x130ECe48414C060792D7eFb18aCF7687F150D75a";
        contractInstance= new ethers.Contract(contractAddress, abi, signer);

        return {contractInstance,chainId,selectedAccount,signer}
    } catch (error) {
        console.log("something went wrong in web3State",error.message); 
        throw error
        
    }
    
}

//This is a step 1

// step 17
//Adding authentication process for auto login