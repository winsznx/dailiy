export const CONTRACTS = {
    DailiySBT: {
        address: {
            base: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE || '',
            baseSepolia: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE_SEPOLIA || '',
        },
        abi: [
            "function mint(string memory _tokenURI) public",
            "function balanceOf(address owner) public view returns (uint256)",
            "function tokenURI(uint256 tokenId) public view returns (string memory)",
            "function hasMinted(address user) public view returns (bool)",
            "function FIRST_MINT_PRICE() public view returns (uint256)",
            "function REGULAR_PRICE() public view returns (uint256)",
            "event Sealed(address indexed user, uint256 indexed tokenId, string tokenURI, uint256 price)"
        ],
    },
    USDC: {
        address: {
            base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            baseSepolia: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
        },
        abi: [
            "function approve(address spender, uint256 amount) public returns (bool)",
            "function allowance(address owner, address spender) public view returns (uint256)",
            "function balanceOf(address account) public view returns (uint256)",
            "function decimals() public view returns (uint8)",
        ],
    },
} as const;

export const CHAIN_CONFIG = {
    8453: 'base',
    84532: 'baseSepolia',
} as const;

export type ChainId = keyof typeof CHAIN_CONFIG;
export type ChainName = typeof CHAIN_CONFIG[ChainId];
