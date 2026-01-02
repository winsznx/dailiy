import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    const network = await ethers.provider.getNetwork();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Network:", network.name, "Chain ID:", network.chainId.toString());

    // Real USDC addresses on Base networks
    const USDC_ADDRESSES: { [key: string]: string } = {
        "8453": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",  // Base Mainnet
        "84532": "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Base Sepolia
    };

    const chainId = network.chainId.toString();
    const usdcAddress = USDC_ADDRESSES[chainId];

    if (!usdcAddress) {
        throw new Error(`USDC not supported on chain ${chainId}. Please use Base or Base Sepolia.`);
    }

    console.log("Using USDC at:", usdcAddress);

    // Deploy DailiySBT
    const DailiySBT = await ethers.getContractFactory("DailiySBT");
    const dailiySBT = await DailiySBT.deploy(usdcAddress, deployer.address);

    await dailiySBT.waitForDeployment();
    const contractAddress = await dailiySBT.getAddress();

    console.log("\n✅ DailiySBT deployed to:", contractAddress);
    console.log("\n📝 Update your frontend with:");
    console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
    console.log(`NEXT_PUBLIC_USDC_ADDRESS=${usdcAddress}`);

    // Wait for block confirmations before verification
    console.log("\nWaiting for block confirmations...");
    await dailiySBT.deploymentTransaction()?.wait(5);

    // Verify on Basescan
    if (network.name !== "hardhat" && network.name !== "localhost") {
        console.log("\nVerifying contract on Basescan...");
        try {
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: [usdcAddress, deployer.address],
            });
            console.log("✅ Contract verified on Basescan");
        } catch (error: any) {
            if (error.message.includes("Already Verified")) {
                console.log("✅ Contract already verified on Basescan");
            } else {
                console.log("❌ Verification failed:", error.message);
            }
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
