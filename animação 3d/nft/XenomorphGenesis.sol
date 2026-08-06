// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title XenomorphGenesis
 * @dev Exclusive 1/1 NFT for Xenomorph Xano Alien
 * Deploy this contract, then call mintGenesis() once.
 */
contract XenomorphGenesis is ERC721URIStorage, Ownable {
    uint256 public constant MAX_SUPPLY = 1;
    uint256 private _tokenIdCounter;
    string public baseTokenURI;

    event GenesisMinted(address indexed to, uint256 indexed tokenId);

    constructor(string memory _baseURI) ERC721("Xenomorph Genesis", "XANO") Ownable(msg.sender) {
        baseTokenURI = _baseURI;
    }

    /**
     * @dev Mint the unique 1/1 Genesis NFT. Can only be called once by the owner.
     */
    function mintGenesis(address to) external onlyOwner {
        require(_tokenIdCounter < MAX_SUPPLY, "Genesis already minted");
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked(baseTokenURI, "metadata.json")));

        emit GenesisMinted(to, tokenId);
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    // Optional: update base URI if metadata moves
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseTokenURI = newBaseURI;
    }
}
