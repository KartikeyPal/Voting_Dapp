const express = require('express');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
exports.validation = async(req,res,next)=>{
    const token = req.headers['token'];
    // console.log(token);
    if(!token){
        return res.status(500).json({
            success:'false',
            error:"validation failed",
            message:"token expired/Not present please login again",
        })
    }
    try {
        const decode = jwt.verify(token,'secretkey');
        // console.log(decode.accountAddress);
        req.accountAddress = decode.accountAddress;
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:"validation failed",
            message:"something went wrong in validation middleware",
        })
    }
}