pragma solidity ^0.6.2;

contract Ownable {
    address payable _owner;
    
    constructor () public {
        _owner = msg.sender;
    }
    
    modifier onlyOwner () {
        require(isOwner(), "You are not allowed");
        _;
    }
    
    function isOwner() public view returns(bool) {
        return (msg.sender == _owner);
    }
}