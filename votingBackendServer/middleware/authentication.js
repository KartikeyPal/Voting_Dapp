const express = require('express');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken')
exports.authentication = async (req,res,next)=>{
    //fetching data
    const {accountAddress} =req.query;
    const {signature} = req.body;

    //validation
    if(!accountAddress || !signature){
        return res.status(500).json({
            success:false,
            message:"authentication failed"
        })
    }
    // console.log(accountAddress," ",signature)
    const message = "You accept the terms and conditions of voting Dapp";
    const recoveredAddress = ethers.utils.verifyMessage(message,signature);
    // console.log(recoveredAddress);
    if(recoveredAddress.toLocaleLowerCase() === accountAddress.toLocaleLowerCase()){
        const token = jwt.sign({accountAddress},'secretkey')
        return res.status(200).json({
            success:true,
            message:"authentication successfull",
            token:token,
        })

    }
    return res.status(500).json({
        success:false,
        message:"authenticatoin failed",
    })

}

