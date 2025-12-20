import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    networks: {
        base: {
            url: "https://mainnet.base.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 8453,
        },
        baseSepolia: {
            url: "https://sepolia.base.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 84532,
        },
        hardhat: {
            // forking: {
            //   url: "https://mainnet.base.org",
            //   enabled: true,
            // }
        }
    },
    sourcify: {
        enabled: true
    },
    etherscan: {
        apiKey: {
            base: process.env.BASESCAN_API_KEY || "PLACEHOLDER_KEY",
            baseSepolia: process.env.BASESCAN_API_KEY || "PLACEHOLDER_KEY"
        },
        customChains: [
            {
                network: "base",
                chainId: 8453,
                urls: {
                    apiURL: "https://api.basescan.org/api",
                    browserURL: "https://basescan.org"
                }
            },
            {
                network: "baseSepolia",
                chainId: 84532,
                urls: {
                    apiURL: "https://api-sepolia.basescan.org/api",
                    browserURL: "https://sepolia.basescan.org"
                }
            }
        ]
    }
};

export default config;
