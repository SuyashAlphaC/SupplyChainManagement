# Supply Chain Management System

## Overview

**This project is a comprehensive supply chain management system built using Solidity smart contracts and a React.js frontend. It allows for the tracking and management of products throughout the supply chain, including creating new products, shipping and receiving, and performing quality control checks.**

## Key Features

- **Product lifecycle management**: Create, ship, receive, and perform quality checks on products.
- **Role-based access control**: Manage permissions for different participants in the supply chain.
- **Robust data storage and tracking**: Record all product movements and quality control activities.
- **Intuitive web-based dashboard**: Monitor supply chain status and interact with the contracts.

## Project Structure

The project is organized into the following main components:

### 1. Smart Contracts

- **ProductManager**: Handles the creation, shipping, and receiving of products.
- **QualityControl**: Manages the quality control process for products.
- **RoleManager**: Handles role-based access control for the system.
- **SupplyChainStorage**: Stores all supply chain-related data.

### 2. Front End

- **SupplyChainDashboard**: The main React component that displays the supply chain data and enables user interactions.
- **Web3 integration** :

- _Web3Context_: Manages the Web3 service and provides context to the components.
- _Web3Service_: Handles interactions with the smart contracts.
- _hooks_: Custom hooks for managing product and quality control data.

### 3. Scripts

- **DeploySupplyChain.s.sol**: Foundry deployment script for the smart contracts.
- **export-deployments.js**: Extracts deployed contract addresses and exports them to the frontend.
- **copy-abis.js**: Copies the contract ABIs to the frontend.

## Getting Started

1. Set up the Foundry development environment: https://book.getfoundry.sh/getting-started/installation.html
2. Clone the repository and navigate to the project directory.
3. Create a .env file in the project root with the following content:

```shell
$ PRIVATE_KEY=your_private_key_here
$ RPC_URL=your_rpc_url_here
```

4. Deploy the contracts:

```shell
# Compile contracts
$ make build

# Deploy to network
$ make deploy args= "network-sepolia"

# Export addresses to frontend
$ node scripts/export-deployments.js
```

5. Start the frontend development server:

```shell
# Navigate to the frontend directory
$ cd frontend

# Install dependencies and start the dev server
$ npm install
$ npm run dev
```

The application should now be running
