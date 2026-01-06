# Dailiy

On chain journaling standard for the Web3 ecosystem. Dailiy empowers developers, traders, and creators to seamlessly document their journeys with AI powered voice commands and text inputs. Entries are organized, analyzable, and optionally sealed on chain as Proof of Thought Soulbound Tokens (SBTs).

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Configuration](#configuration)
8. [Usage](#usage)
9. [Smart Contracts](#smart-contracts)
10. [Deployment](#deployment)
11. [Contributing](#contributing)
12. [License](#license)

## Overview

Dailiy integrates directly into users' Web3 identities via wallet hooks, reducing context switching and turning scattered notes into an immutable, evolving ledger. Built as a Base Mini App with multi chain support for Base, Celo, Optimism, and other EVM compatible chains.

### Target Audience

**Web3 Developers**: Logging hackathon progress, bug fixes, and code ideas.

**Traders and DeFi Users**: Recording trade rationales, market predictions, and post mortems.

**Creators and Builders**: Capturing creative processes, alpha insights, and collaborative brainstorms.

## Features

### Voice Activated Entry Capture
Trigger entry capture via voice command or text input. AI powered transcription with automatic categorization using NLP tags.

### Proof of Thought Sealing
Mint journal entries as Soulbound Tokens (ERC721) on Base L2. Commit reveal scheme enables timestamp verification while preserving privacy.

### Analytics Dashboard
Sentiment analysis across entries with productivity heatmaps and visual insights. Weekly reports delivered via wallet notifications.

### Context Aware Prompts
Integration triggers from wallet events and GitHub activity. Predictive prompts based on user patterns and behaviors.

### Collaboration Tools
Multi signature entries for team journals with Git like branching. Royalty splits on downstream uses of sealed ideas.

### Export and Publishing
One click publish to social platforms. Build in public mode with redacted teasers and scheduled reveals.

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Wagmi | Wallet integration |
| OnchainKit | Coinbase wallet support |
| Reown AppKit | Multi wallet connectivity |

### Smart Contracts
| Technology | Purpose |
|------------|---------|
| Solidity 0.8.20 | Contract language |
| Hardhat | Development framework |
| OpenZeppelin 5.x | Security patterns |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| Vercel | Hosting and serverless functions |
| Base L2 | Primary blockchain |
| IPFS | Decentralized storage |

## Project Structure

```
dailiy/
├── contracts/           # Smart contracts
│   ├── contracts/       # Solidity source files
│   │   ├── DailiySBT.sol    # Soulbound token contract
│   │   └── MockUSDC.sol     # Test token
│   ├── script/          # Deployment scripts
│   ├── test/            # Contract tests
│   └── hardhat.config.ts
├── web/                 # Frontend application
│   ├── app/             # Next.js app router
│   │   ├── about/
│   │   ├── auth/
│   │   ├── blog/
│   │   ├── dashboard/
│   │   ├── features/
│   │   ├── pricing/
│   │   └── page.tsx
│   ├── components/      # React components
│   ├── config/          # App configuration
│   ├── context/         # React context providers
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utility functions
│   └── public/          # Static assets
├── architecture.md      # Technical documentation
└── vercel.json          # Deployment config
```

## Prerequisites

Node.js version 18.0.0 or higher

npm version 9.0.0 or higher

A Web3 wallet (Coinbase Wallet, MetaMask, or compatible)

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/dailiy.git
cd dailiy
```

### Install Frontend Dependencies

```bash
cd web
npm install
```

### Install Contract Dependencies

```bash
cd ../contracts
npm install
```

## Configuration

### Environment Variables

Create a `.env.local` file in the `web` directory:

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
```

Create a `.env` file in the `contracts` directory:

```
PRIVATE_KEY=your_deployer_private_key
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASESCAN_API_KEY=your_basescan_api_key
```

## Usage

### Development Server

Start the frontend development server:

```bash
cd web
npm run dev
```

The application will be available at `http://localhost:3000`.

### Compile Contracts

```bash
cd contracts
npm run compile
```

### Run Contract Tests

```bash
cd contracts
npm test
```

## Smart Contracts

### DailiySBT

The core contract implementing Soulbound Tokens for Proof of Thought entries.

**Features**

Implements ERC721 with soulbound transfer restrictions.

USDC payment integration with tiered pricing.

First mint costs 1 USDC, subsequent mints cost 0.1 USDC.

Non transferable after minting to ensure authenticity.

**Key Functions**

`mint(string memory _tokenURI)`: Mint a new Proof of Thought token.

`hasMinted(address)`: Check if an address has previously minted.

`withdrawUSDC()`: Owner function to withdraw collected fees.

### Contract Addresses

Contracts are deployed on Base Sepolia testnet for development and Base Mainnet for production. Refer to deployment scripts for current addresses.

## Deployment

### Frontend Deployment

The frontend is configured for Vercel deployment:

```bash
cd web
npm run build
vercel deploy
```

### Contract Deployment

Deploy contracts to Base Sepolia:

```bash
cd contracts
npm run deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

Please ensure all tests pass and follow the existing code style.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
