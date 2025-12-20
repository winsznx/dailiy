import { ethers } from "hardhat";

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Default to Base Mainnet USDC if not specified
    // Base Mainnet USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
    // Base Sepolia USDC: 0x036CbD53842c5426634e7929541eC2318f3dCF7e

    let usdcAddress = process.env.USDC_ADDRESS;

    if (!usdcAddress) {
        console.warn("No USDC_ADDRESS env var found. Using Base Mainnet USDC execution as default if network is appropriate.");
        // Simple check for chain ID could be added here, but for now we assume the user configuring .env
        usdcAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
    }

    const dailiySBT = await ethers.deployContract("DailiySBT", [usdcAddress, deployer.address]);

    await dailiySBT.waitForDeployment();

    console.log(
        `DailiySBT deployed to ${dailiySBT.target}`
    );

    console.log("Make sure to update the frontend 'constants.ts' with this address!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
