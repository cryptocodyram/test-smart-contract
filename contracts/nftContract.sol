// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract WhrrlNFTContract is ERC721 {

  /// @dev next token Id that will be minted
  uint256 private _id;

  constructor() ERC721("WhrrlNFTContract", "WNFT") {}

  function mint() external {
    _id++;
    _mint(msg.sender, _id);
  }

  function burn(uint256 nftId_) external {
    _burn(nftId_);
  }
}