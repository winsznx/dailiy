"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Loader2, CheckCircle, AlertCircle, Shield } from "lucide-react"
import { useAccount, useChainId } from "wagmi"
import { useMintSBT, useApproveUSDC, useMintPrice, useUSDCBalance, useHasMinted } from "@/lib/contracts/hooks"
import { CHAIN_CONFIG, type ChainId } from "@/lib/contracts/config"
import { useJournalStore } from "@/lib/store"

interface SealEntryModalProps {
    entryId: string
    entryTitle: string
    entryContent: string
    onClose: () => void
}

export function SealEntryModal({ entryId, entryTitle, entryContent, onClose }: SealEntryModalProps) {
    const { address } = useAccount()
    const chainId = useChainId() as ChainId
    const { updateEntry } = useJournalStore()

    const [step, setStep] = useState<'approve' | 'mint' | 'success'>('approve')

    const { balance } = useUSDCBalance(address, chainId)
    const { priceInUSDC, isFirstMint } = useMintPrice(address, chainId)
    const { approve, isPending: isApproving, isConfirming: isApprovingConfirming, isSuccess: isApproved } = useApproveUSDC()
    const { mint, isPending: isMinting, isConfirming: isMintingConfirming, isSuccess: isMinted, hash } = useMintSBT()

    const hasEnoughBalance = parseFloat(balance) >= parseFloat(priceInUSDC)

    // Auto-advance to mint step when approval succeeds
    if (isApproved && step === 'approve') {
        setStep('mint')
    }

    // Auto-advance to success when mint succeeds
    if (isMinted && step === 'mint') {
        setStep('success')
        // Update the entry with txHash and sealed status
        updateEntry(entryId, {
            txHash: hash,
            sealedOnChain: true,
        })
    }

    const handleApprove = async () => {
        if (!address) return
        await approve(chainId, priceInUSDC)
    }

    const handleMint = async () => {
        if (!address) return
        // Create metadata URI (in production, upload to IPFS)
        const tokenURI = `data:application/json;base64,${btoa(JSON.stringify({
            name: entryTitle,
            description: entryContent.substring(0, 200),
            attributes: [
                { trait_type: "Type", value: "Journal Entry" },
                { trait_type: "Timestamp", value: Date.now() }
            ]
        }))}`

        await mint(chainId, tokenURI)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <Card className="max-w-lg w-full p-6 space-y-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-navy to-brand-teal flex items-center justify-center">
                            <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Seal Entry On-Chain</h3>
                            <p className="text-sm text-muted-foreground">Mint as Soulbound Token</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                        <p className="text-sm font-medium">Entry: {entryTitle}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{entryContent}</p>
                    </div>

                    <div className="flex justify-between items-center p-4 border rounded-lg">
                        <span className="text-sm">Price</span>
                        <div className="text-right">
                            <p className="font-bold">{priceInUSDC} USDC</p>
                            <p className="text-xs text-brand-teal">{isFirstMint ? 'First Mint Discount!' : 'Regular Price'}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-4 border rounded-lg">
                        <span className="text-sm">Your Balance</span>
                        <p className={`font-bold ${hasEnoughBalance ? 'text-green-500' : 'text-red-500'}`}>
                            {balance} USDC
                        </p>
                    </div>

                    {!hasEnoughBalance && (
                        <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <p className="text-sm text-red-500">Insufficient USDC balance</p>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    {step === 'approve' && (
                        <Button
                            className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white"
                            onClick={handleApprove}
                            disabled={!hasEnoughBalance || isApproving || isApprovingConfirming}
                        >
                            {isApproving || isApprovingConfirming ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    {isApproving ? 'Approving...' : 'Confirming...'}
                                </>
                            ) : (
                                'Approve USDC'
                            )}
                        </Button>
                    )}

                    {step === 'mint' && (
                        <Button
                            className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white"
                            onClick={handleMint}
                            disabled={isMinting || isMintingConfirming}
                        >
                            {isMinting || isMintingConfirming ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    {isMinting ? 'Minting...' : 'Confirming...'}
                                </>
                            ) : (
                                'Seal Entry'
                            )}
                        </Button>
                    )}

                    {step === 'success' && (
                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Successfully Sealed!</h4>
                                <p className="text-sm text-muted-foreground">Your entry is now permanently on-chain</p>
                            </div>
                            {hash && (
                                <a
                                    href={`https://${chainId === 8453 ? '' : 'sepolia.'}basescan.org/tx/${hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-brand-teal hover:underline"
                                >
                                    View on Basescan →
                                </a>
                            )}
                            <Button onClick={onClose} className="w-full">Close</Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}
