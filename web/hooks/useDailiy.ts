import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import DailiySBTArtifact from '@/lib/contracts/DailiySBT.json';
import MockUSDCArtifact from '@/lib/contracts/MockUSDC.json'; // Using Mock artifact for ABI, interface is standard ERC20
import { DAILIY_CONTRACT_ADDRESS, USDC_ADDRESS } from '@/lib/constants';
import { parseUnits } from 'viem';

export function useDailiy() {
    const { address } = useAccount();

    // Check if user has minted
    const { data: hasMinted, isLoading: isLoadingHasMinted } = useReadContract({
        address: DAILIY_CONTRACT_ADDRESS as `0x${string}`,
        abi: DailiySBTArtifact.abi,
        functionName: 'hasMinted',
        args: [address],
        query: {
            enabled: !!address
        }
    });

    // Write contracts
    const { writeContract: writeDailiy, data: dailiyHash, isPending: isDailiyPending, error: dailiyError } = useWriteContract();
    const { writeContract: writeUsdc, data: usdcHash, isPending: isUsdcPending, error: usdcError } = useWriteContract();

    // Transaction Receipts
    const { isLoading: isDailiyConfirming, isSuccess: isDailiySuccess } = useWaitForTransactionReceipt({
        hash: dailiyHash,
    });

    const { isLoading: isUsdcConfirming, isSuccess: isUsdcSuccess } = useWaitForTransactionReceipt({
        hash: usdcHash,
    });

    const approveUSDC = (amount: string) => {
        // Amount should be in human readable format (e.g. "1.0")
        // USDC has 6 decimals
        const amountBigInt = parseUnits(amount, 6);
        writeUsdc({
            address: USDC_ADDRESS as `0x${string}`,
            abi: MockUSDCArtifact.abi,
            functionName: 'approve',
            args: [DAILIY_CONTRACT_ADDRESS, amountBigInt]
        });
    };

    const sealEntry = (tokenURI: string) => {
        writeDailiy({
            address: DAILIY_CONTRACT_ADDRESS as `0x${string}`,
            abi: DailiySBTArtifact.abi,
            functionName: 'mint',
            args: [tokenURI]
        });
    };

    return {
        hasMinted,
        isLoadingHasMinted,
        approveUSDC,
        sealEntry,
        isDailiyPending,
        isUsdcPending,
        isDailiyConfirming,
        isUsdcConfirming,
        isDailiySuccess,
        isUsdcSuccess,
        dailiyError,
        usdcError,
        dailiyHash,
        usdcHash
    };
}
