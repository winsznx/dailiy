// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DailiySBT is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable, ReentrancyGuard {
    uint256 private _nextTokenId;
    IERC20 public usdcToken;

    // Prices in USDC (6 decimals)
    uint256 public constant FIRST_MINT_PRICE = 1 * 10**6; // 1 USDC
    uint256 public constant REGULAR_PRICE = 100000;       // 0.1 USDC (0.1 * 10^6)

    mapping(address => bool) public hasMinted;

    event Sealed(address indexed user, uint256 indexed tokenId, string tokenURI, uint256 price);

    constructor(address _usdcTokenAddress, address initialOwner)
        ERC721("Dailiy Proof of Thought", "DAILIY")
        Ownable(initialOwner)
    {
        usdcToken = IERC20(_usdcTokenAddress);
    }

    function mint(string memory _tokenURI) public nonReentrant {
        uint256 price = hasMinted[msg.sender] ? REGULAR_PRICE : FIRST_MINT_PRICE;

        // Transfer USDC from user to this contract
        // User must Approve this contract to spend USDC first
        bool success = usdcToken.transferFrom(msg.sender, address(this), price);
        require(success, "USDC transfer failed");

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        hasMinted[msg.sender] = true;

        emit Sealed(msg.sender, tokenId, _tokenURI, price);
    }

    // Soulbound Logic: Prevent transfers
    // Logic for OpenZeppelin 5.x: _update handles transfers, mints and burns.
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        address from = _ownerOf(tokenId);
        
        // If from is not 0 (not Mint) and to is not 0 (not Burn), it's a transfer.
        // We block transfers.
        if (from != address(0) && to != address(0)) {
            revert("DailiySBT: Soulbound tokens cannot be transferred");
        }
        
        return super._update(to, tokenId, auth);
    }

    // Required overrides for ERC721Enumerable and ERC721URIStorage
    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Withdraw funds (Owner only)
    function withdrawUSDC() external onlyOwner {
        uint256 balance = usdcToken.balanceOf(address(this));
        require(balance > 0, "No funds to withdraw");
        usdcToken.transfer(owner(), balance);
    }
}
