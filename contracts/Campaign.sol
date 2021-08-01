pragma solidity ^0.6.2;

import "./Ownable.sol";

contract Campaign is Ownable{
    
    uint public totalFunds;
    
    function donate() public payable {
        totalFunds += msg.value;
    }

    function collectedFunds() public  view returns  (uint) {
        return totalFunds;
    }
    
    function withdrawal() public  onlyOwner payable {
        uint funds = totalFunds;
        totalFunds = 0;
        _owner.transfer(funds);
    }
    
    
}