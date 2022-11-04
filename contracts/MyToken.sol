// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTT"){
        _mint(msg.sender, initialSupply);
    }

    function mint(uint256 _supply) public onlyOwner returns(bool) {
        _mint(msg.sender, _supply);

        return true;
    }
}