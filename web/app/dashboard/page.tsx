"use client"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    LayoutDashboard,
    Book,
    ShieldCheck,
    Settings,
    Search,
    Bell,
    Mic,
    Plus,
    X,
    MoreHorizontal,
    Loader2,
    CheckCircle
} from "lucide-react"
import Link from "next/link"
import clsx from "clsx"
import { useAccount, useEnsName } from "wagmi"
import { useJournalStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { useVoiceInput } from "@/hooks/useVoiceInput"
import { useDailiy } from "@/hooks/useDailiy"

function timeAgo(date: number) {
    const seconds = Math.floor((Date.now() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

export default function DashboardPage() {
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { entries, addEntry, deleteEntry, updateEntry } = useJournalStore()
    const [isCreating, setIsCreating] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newContent, setNewContent] = useState("")

    // Voice Hooks
    const { isListening, transcript, startListening, stopListening, resetTranscript } = useVoiceInput()

    // Contract Hooks
    const {
        hasMinted,
        approveUSDC,
        sealEntry,
        isDailiyPending,
        isUsdcPending,
        isDailiyConfirming,
        isUsdcConfirming,
        isDailiySuccess,
        isUsdcSuccess,
        dailiyError,
        usdcError
    } = useDailiy()

    // Sync voice transcript to content
    useEffect(() => {
        if (isCreating && transcript) {
            setNewContent(transcript);
        }
    }, [transcript, isCreating]);

    // Handle Seal Success
    useEffect(() => {
        if (isDailiySuccess) {
            console.log("Sealed successfully!");
            // In a real app, we would update the store to mark this entry as sealed with the TX hash
            // For now, let's just alert
            alert("Entry Sealed Permanently on Base!");
        }
    }, [isDailiySuccess])

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
        { icon: <Book size={20} />, label: "Entries", active: false },
        { icon: <ShieldCheck size={20} />, label: "Seals", active: false },
        { icon: <Settings size={20} />, label: "Settings", active: false },
    ]

    const handleCreate = async () => {
        if (!newTitle || !newContent) return

        // Call API for analysis
        let sentimentScore = 0.5;
        let tags = ["Journal"];

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newContent })
            });
            if (response.ok) {
                const data = await response.json();
                sentimentScore = data.sentimentScore;
                tags = data.tags;
            }
        } catch (e) {
            console.error("Failed to analyze", e);
        }

        addEntry({
            title: newTitle,
            content: newContent,
            tags: tags,
            sentimentScore: sentimentScore
        })
        setIsCreating(false)
        setNewTitle("")
        setNewContent("")
        resetTranscript()
    }

    const handleSeal = (entryContent: string) => {
        // 1. Check allowances (Simulated step, usually we read allowance)
        // 2. Approve if needed
        // 3. Mint

        // For UX simplicity here in this view:
        // We assume we need to approve first. 
        // Real logic: Read Allowance -> If < Price -> Approve -> Wait -> Mint.

        const price = hasMinted ? "0.1" : "1.0";
        if (confirm(`Sealing this entry costs ${price} USDC. Proceed?`)) {
            // Mock IPFS upload
            const ipfsHash = "ipfs://" + btoa(entryContent).substring(0, 32);

            // Trigger Approve (Users must click twice for now in this simple flow, or we use a better hook orchestration)
            // simplified flow:
            approveUSDC(price);
            // Note: In reality, we shouldn't fire mint immediately after approve call without waiting.
            // Users will have to click "Seal" again after approval, or we build a multi-step modal.
            // Let's rely on user clicking "Seal" again/ checking pending states.
        }
    }

    // Better Seal Handler for the button
    const onSealClick = (content: string) => {
        const price = hasMinted ? "0.1" : "1.0";
        // We'll just try to mint. If allowance fails, the contract errors or we catch it.
        // But effectively we should probably approve first.
        // Let's just try to Approve for this demo flow.
        approveUSDC(price);
    }

    const onMintClick = (content: string) => {
        const ipfsHash = "ipfs://" + btoa(content).substring(0, 32);
        sealEntry(ipfsHash);
    }

    if (!isConnected) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p className="text-muted-foreground mb-6">Please connect your wallet to view your secure on-chain journal.</p>
                <Button asChild><Link href="/">Return Home</Link></Button>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar - Desktop */}
            <aside className="w-64 border-r border-border hidden md:flex flex-col bg-muted/10">
                <div className="h-16 flex items-center px-6 border-b border-border/50">
                    <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-navy to-brand-teal flex items-center justify-center text-white font-bold shadow-lg">
                            D
                        </div>
                        <span>Dailiy</span>
                    </Link>
                </div>

                <div className="p-4 space-y-2 flex-grow">
                    {navItems.map((item, i) => (
                        <button
                            key={i}
                            className={clsx(
                                "flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                item.active
                                    ? "bg-brand-navy/10 text-brand-navy dark:bg-white/10 dark:text-white"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-border/50">
                    <div className="flex items-center space-x-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-xs text-white font-bold">
                            {address ? address.substring(2, 4) : 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{ensName || (address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'User')}</p>
                            <p className="text-xs text-muted-foreground truncate">Free Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input type="text" placeholder="Search entries..." className="w-full h-9 pl-9 pr-4 rounded-md bg-muted/30 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button
                            className="hidden sm:flex bg-brand-teal hover:bg-brand-teal/90 text-white"
                            onClick={() => setIsCreating(true)}
                        >
                            <Plus className="h-4 w-4 mr-2" /> New Entry
                        </Button>
                    </div>
                </header>

                <main className="flex-grow p-6 overflow-y-auto">
                    {/* Dashboard Content */}
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Creation Form */}
                        {isCreating && (
                            <Card className="p-6 border-brand-teal/50 shadow-brand-teal/10 animate-fade-in-up">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold">New Journal Entry</h3>
                                    <Button variant="ghost" size="icon" onClick={() => setIsCreating(false)}><X className="h-4 w-4" /></Button>
                                </div>
                                <div className="space-y-4">
                                    <input
                                        className="w-full text-lg font-bold bg-transparent border-b border-border focus:border-brand-teal focus:outline-none py-2"
                                        placeholder="Title your thought..."
                                        value={newTitle}
                                        onChange={e => setNewTitle(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="relative">
                                        <textarea
                                            className="w-full h-32 bg-muted/20 rounded-md p-3 resize-none focus:outline-none focus:ring-1 focus:ring-brand-teal"
                                            placeholder="What's on your mind? (Markdown supported)"
                                            value={newContent}
                                            onChange={e => setNewContent(e.target.value)}
                                        />
                                        <div className="absolute bottom-2 right-2">
                                            <Button
                                                size="sm"
                                                variant={isListening ? "destructive" : "secondary"}
                                                className="h-8 rounded-full px-3 text-xs"
                                                onClick={isListening ? stopListening : startListening}
                                            >
                                                {isListening ? <span className="animate-pulse mr-1">●</span> : <Mic className="h-3 w-3 mr-1" />}
                                                {isListening ? "Stop" : "Dictate"}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                                        <Button onClick={handleCreate} disabled={!newTitle || !newContent} className="bg-brand-teal text-white">Save Entry</Button>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Greeting */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                                <h1 className="text-2xl font-bold">Good afternoon, {ensName || (address ? 'Builder' : 'Guest')}</h1>
                                <p className="text-muted-foreground">Here's what's happening with your on-chain journey.</p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex space-x-2">
                                <Button
                                    variant="outline"
                                    className="border-brand-teal/20 text-brand-teal hover:bg-brand-teal/10"
                                    onClick={() => {
                                        setIsCreating(true);
                                        startListening();
                                    }}
                                >
                                    <Mic className="h-4 w-4 mr-2" /> Voice Mode
                                </Button>
                            </div>
                        </div>

                        {/* Recent Entries */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Recent Entries</h2>
                            </div>

                            <div className="space-y-4">
                                {entries.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
                                        No entries yet. Start writing!
                                    </div>
                                ) : (
                                    entries.map((entry) => (
                                        <Card key={entry.id} className="hover:border-brand-teal/50 transition-colors cursor-pointer group">
                                            <div className="p-4 flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium group-hover:text-brand-teal transition-colors">{entry.title}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{entry.content}</p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <span className="text-xs text-muted-foreground">{timeAgo(entry.timestamp)}</span>
                                                        <span className="text-xs text-muted-foreground">•</span>
                                                        {entry.tags.map(tag => (
                                                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium border border-border">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">

                                                    {/* Seal Button */}
                                                    <div className="flex space-x-1">
                                                        {isUsdcPending || isUsdcConfirming ? (
                                                            <Button size="sm" variant="outline" disabled className="h-8 w-24">
                                                                <Loader2 className="h-3 w-3 animate-spin mr-1" /> Approving
                                                            </Button>
                                                        ) : isDailiyPending || isDailiyConfirming ? (
                                                            <Button size="sm" variant="outline" disabled className="h-8 w-24">
                                                                <Loader2 className="h-3 w-3 animate-spin mr-1" /> Sealing
                                                            </Button>
                                                        ) : (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    variant="secondary"
                                                                    className="h-8 text-xs bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy dark:bg-white/10 dark:text-white border border-transparent hover:border-brand-navy/20 dark:hover:border-white/20"
                                                                    onClick={(e) => { e.stopPropagation(); onSealClick(entry.content); }}
                                                                >
                                                                    Approve
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="h-8 text-xs border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                                                                    onClick={(e) => { e.stopPropagation(); onMintClick(entry.content); }}
                                                                >
                                                                    <ShieldCheck className="h-3 w-3 mr-1" /> Seal
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>

                                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); deleteEntry(entry.id); }}>
                                                        <X className="h-4 w-4 hover:text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
