// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract TokenMarketPlace{
    using SafeERC20 for IERC20;
    using SafeMath for uint;
    uint public tokenPrice = 2e16 wei;
    uint public sellerCount=1;
    uint public prevAdjustedRatio;
    uint public buyerCount=0;
    
    IERC20 public gldToken;

    event TokenPriceUpdated(uint newPrice);
    event TokenBought(address indexed buyer,uint amount, uint tokenPrice);
    event TokenSold(address indexed seller,uint amount,uint tokenPrice);

    constructor(address _erc20Token){
        gldToken=IERC20( _erc20Token);
    }

    function adjustTokenPriceBasedOnDemand() public {
        // uint marketDemandRatio = buyerCount.mul(1e18).div(sellerCount); 
        // uint smoothingFactor = 1e18;
        // uint adjustedRatio = marketDemandRatio.add(smoothingFactor).div(2);
        // uint newTokenPrice =  tokenPrice.mul(adjustedRatio).div(1e18);
        // uint minimumPrice = 2e16;
        // if(newTokenPrice<minimumPrice){
        //     tokenPrice = minimumPrice;
        // }
        // tokenPrice = newTokenPrice;

        uint marketDemandRatio = buyerCount.mul(1e18).div(sellerCount); 
        uint smoothingFactor = 1e18;
        uint adjustedRatio = marketDemandRatio.add(smoothingFactor).div(2);
        if(prevAdjustedRatio!=adjustedRatio){
            prevAdjustedRatio=adjustedRatio;
            uint newTokenPrice =  tokenPrice.mul(adjustedRatio).div(1e18);
            uint minimumPrice = 2e16;
            if(newTokenPrice<minimumPrice){
                tokenPrice = minimumPrice;
            }
            tokenPrice = newTokenPrice;
        }
    }

    // Buy tokens from the marketplace
    function buyGLDToken(uint256 _amountOfToken) public payable {
        require(_amountOfToken>0,"your amount shoud be greater than 0");
        require(gldToken.balanceOf(address(this)) >= _amountOfToken, "Insufficient token balance in contract");
        uint amountToPay = calculateTokenPrice(_amountOfToken);
        require(msg.value>=amountToPay,"incorrect token price");
        gldToken.safeTransfer(msg.sender, _amountOfToken);
        if (msg.value > amountToPay) {
            payable(msg.sender).transfer(msg.value - amountToPay);
        }
        // (bool success,) = payable(msg.sender).call{value:amountToPay}("");
        // require(success,"transaction failed");
          buyerCount = buyerCount.add(1);
        emit TokenBought(msg.sender, _amountOfToken, amountToPay);
    }

    function calculateTokenPrice(uint _amountOfToken) public returns(uint){
        require(_amountOfToken>0,"amount of token shoulb be >0");
        adjustTokenPriceBasedOnDemand();
        uint amountToPay = _amountOfToken.mul(tokenPrice).div(1e18);
        return amountToPay;
    }

    // Sell tokens back to the marketplace
    function sellGLDToken(uint256 amountOfToken) public {
        require(amountOfToken>0,"amount of token should be greater than 0");
        uint amountToGet = calculateTokenPrice(amountOfToken);
        gldToken.safeTransferFrom(msg.sender,address(this),amountOfToken);
        payable(msg.sender).transfer(amountToGet);
        emit TokenSold(msg.sender,amountOfToken,amountToGet);
        sellerCount++;
    }

    fallback() external payable { }
    receive() external payable { }
}