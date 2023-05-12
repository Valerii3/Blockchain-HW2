// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PoetryNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;

    struct Poetry {
        string title;
        string author;
        string text;
    }

    mapping(uint256 => Poetry) private poetries;

    constructor() ERC721("TokenNFT", "POETRY") {}

    function publishPoetry(string memory title, string memory author, string memory text) public returns (uint256) {
        tokenIds.increment();

        uint256 tokenId = tokenIds.current();
        _mint(msg.sender, tokenId);

        Poetry memory newPoetry = Poetry(title, author, text);
        poetries[tokenId] = newPoetry;

        return tokenId;
    }

    function getPoetry(uint256 tokenId) public view returns (string memory, string memory, string memory) {
        require(_exists(tokenId), "Token does not exist");

        Poetry memory poetry = poetries[tokenId];
        return (poetry.title, poetry.author, poetry.text);
    }
}
