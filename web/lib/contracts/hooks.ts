import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { CONTRACTS, CHAIN_CONFIG, type ChainId } from './config';
import { parseUnits, formatUnits } from 'viem';

export function useMintSBT() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const mint = async (chainId: ChainId, tokenURI: string) => {
        const chainName = CHAIN_CONFIG[chainId];
        const contractAddress = CONTRACTS.DailiySBT.address[chainName];

        if (!contractAddress) {
            throw new Error(`Contract not deployed on chain ${chainId}`);
        }

        writeContract({
            address: contractAddress as `0x${string}`,
            abi: CONTRACTS.DailiySBT.abi,
            functionName: 'mint',
            args: [tokenURI],
        });
    };

    return {
        mint,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error,
    };
}

export function useApproveUSDC() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const approve = async (chainId: ChainId, amount: string) => {
        const chainName = CHAIN_CONFIG[chainId];
        const usdcAddress = CONTRACTS.USDC.address[chainName];
        const contractAddress = CONTRACTS.DailiySBT.address[chainName];

        if (!usdcAddress || !contractAddress) {
            throw new Error(`Contracts not available on chain ${chainId}`);
        }

        const amountInWei = parseUnits(amount, 6); // USDC has 6 decimals

        writeContract({
            address: usdcAddress as `0x${string}`,
            abi: CONTRACTS.USDC.abi,
            functionName: 'approve',
            args: [contractAddress, amountInWei],
        });
    };

    return {
        approve,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error,
    };
}

export function useHasMinted(address: `0x${string}` | undefined, chainId: ChainId) {
    const chainName = CHAIN_CONFIG[chainId];
    const contractAddress = CONTRACTS.DailiySBT.address[chainName];

    const { data, isLoading, error } = useReadContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACTS.DailiySBT.abi,
        functionName: 'hasMinted',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && !!contractAddress,
        },
    });

    return {
        hasMinted: data as boolean | undefined,
        isLoading,
        error,
    };
}

export function useMintPrice(address: `0x${string}` | undefined, chainId: ChainId) {
    const chainName = CHAIN_CONFIG[chainId];
    const contractAddress = CONTRACTS.DailiySBT.address[chainName];

    const { hasMinted } = useHasMinted(address, chainId);

    const { data: firstPrice } = useReadContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACTS.DailiySBT.abi,
        functionName: 'FIRST_MINT_PRICE',
        query: {
            enabled: !!contractAddress,
        },
    });

    const { data: regularPrice } = useReadContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACTS.DailiySBT.abi,
        functionName: 'REGULAR_PRICE',
        query: {
            enabled: !!contractAddress,
        },
    });

    const price = hasMinted ? regularPrice : firstPrice;
    const priceInUSDC = price ? formatUnits(price as bigint, 6) : '0';

    return {
        price: price as bigint | undefined,
        priceInUSDC,
        isFirstMint: !hasMinted,
    };
}

export function useUSDCBalance(address: `0x${string}` | undefined, chainId: ChainId) {
    const chainName = CHAIN_CONFIG[chainId];
    const usdcAddress = CONTRACTS.USDC.address[chainName];

    const { data, isLoading, error, refetch } = useReadContract({
        address: usdcAddress as `0x${string}`,
        abi: CONTRACTS.USDC.abi,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && !!usdcAddress,
        },
    });

    const balance = data ? formatUnits(data as bigint, 6) : '0';

    return {
        balance,
        balanceRaw: data as bigint | undefined,
        isLoading,
        error,
        refetch,
    };
}
