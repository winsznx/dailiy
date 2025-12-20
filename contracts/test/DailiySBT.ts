import { expect } from "chai";
import { ethers } from "hardhat";
import { DailiySBT, MockUSDC } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("DailiySBT", function () {
    let dailiySBT: DailiySBT;
    let mockUSDC: MockUSDC;
    let owner: HardhatEthersSigner;
    let user1: HardhatEthersSigner;
    let user2: HardhatEthersSigner;

    const FIRST_PRICE = 1_000_000n; // 1 USDC
    const REGULAR_PRICE = 100_000n; // 0.1 USDC

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy Mock USDC
        const MockUSDCFactory = await ethers.getContractFactory("MockUSDC");
        mockUSDC = await MockUSDCFactory.deploy();

        // Deploy DailiySBT
        const DailiySBTFactory = await ethers.getContractFactory("DailiySBT");
        dailiySBT = await DailiySBTFactory.deploy(await mockUSDC.getAddress(), owner.address);

        // Mint USDC to users
        await mockUSDC.mint(user1.address, 10_000_000n); // 10 USDC
        await mockUSDC.mint(user2.address, 10_000_000n); // 10 USDC

        // Approve DailiySBT to spend USDC
        await mockUSDC.connect(user1).approve(await dailiySBT.getAddress(), ethers.MaxUint256);
        await mockUSDC.connect(user2).approve(await dailiySBT.getAddress(), ethers.MaxUint256);
    });

    it("Should charge 1 USDC for the first mint", async function () {
        await expect(dailiySBT.connect(user1).mint("ipfs://test1"))
            .to.emit(dailiySBT, "Sealed")
            .withArgs(user1.address, 0, "ipfs://test1", FIRST_PRICE);

        expect(await mockUSDC.balanceOf(user1.address)).to.equal(9_000_000n); // 10 - 1 = 9
    });

    it("Should charge 0.1 USDC for subsequent mints", async function () {
        // First mint
        await dailiySBT.connect(user1).mint("ipfs://test1");

        // Second mint
        await expect(dailiySBT.connect(user1).mint("ipfs://test2"))
            .to.emit(dailiySBT, "Sealed")
            .withArgs(user1.address, 1, "ipfs://test2", REGULAR_PRICE);

        expect(await mockUSDC.balanceOf(user1.address)).to.equal(8_900_000n); // 9 - 0.1 = 8.9
    });

    it("Should be soulbound (cannot transfer)", async function () {
        await dailiySBT.connect(user1).mint("ipfs://test1");

        await expect(
            dailiySBT.connect(user1).transferFrom(user1.address, user2.address, 0)
        ).to.be.revertedWith("DailiySBT: Soulbound tokens cannot be transferred");
    });

    it("Owner can withdraw USDC", async function () {
        await dailiySBT.connect(user1).mint("ipfs://test1"); // Calls cost 1 USDC

        const initialOwnerBalance = await mockUSDC.balanceOf(owner.address);
        await dailiySBT.connect(owner).withdrawUSDC();
        const finalOwnerBalance = await mockUSDC.balanceOf(owner.address);

        expect(finalOwnerBalance - initialOwnerBalance).to.equal(FIRST_PRICE);
        expect(await mockUSDC.balanceOf(await dailiySBT.getAddress())).to.equal(0);
    });
});
