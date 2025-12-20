"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Zap, Lock, Wand2 } from "lucide-react"

export default function FeaturesPage() {
    const features = [
        {
            icon: <Wand2 className="h-8 w-8 text-brand-teal" />,
            title: "Voice-Activated Entries",
            description: "Capture your thoughts at the speed of speech. Our AI transcribes, formats, and tags your entries automatically."
        },
        {
            icon: <Lock className="h-8 w-8 text-brand-navy dark:text-white" />,
            title: "Proof-of-Thought SBTs",
            description: "Mint your entries as Soulbound Tokens on Base. Prove you had the idea first with on-chain verification."
        },
        {
            icon: <Zap className="h-8 w-8 text-purple-500" />,
            title: "AI Sentiment Insights",
            description: "Track your mood and productivity over time. Understand what drives your best work with deep analytics."
        },
        {
            icon: <CheckCircle2 className="h-8 w-8 text-green-500" />,
            title: "Seamless Integrations",
            description: "Connect with GitHub, Uniswap, and Coinbase Wallet to automatically log your activities."
        }
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow pt-24">
                {/* Hero */}
                <div className="container mx-auto px-4 text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover What Makes Dailiy Premium</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Built from the ground up for the Web3 ecosystem. Powerful features wrapped in an elegant design.
                    </p>
                </div>

                {/* Detailed Features */}
                <div className="container mx-auto px-4 space-y-24 mb-24">
                    {features.map((feature, idx) => (
                        <div key={idx} className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 space-y-6">
                                <div className="p-4 bg-muted/30 w-fit rounded-2xl">{feature.icon}</div>
                                <h2 className="text-3xl font-bold">{feature.title}</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                                <ul className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <li key={i} className="flex items-center space-x-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-brand-teal"></div>
                                            <span className="text-sm text-foreground/80">Feature benefit point {i}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 bg-muted/10 rounded-2xl border border-border/20 aspect-video flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-brand-teal/5"></div>
                                <span className="text-muted-foreground font-medium">Feature Preview Visualization</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison */}
                <div className="bg-muted/30 py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-16">Why Dailiy Stands Out</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full max-w-4xl mx-auto">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="py-4 text-left font-medium text-muted-foreground">Feature</th>
                                        <th className="py-4 px-8 text-center font-bold text-foreground">Dailiy</th>
                                        <th className="py-4 px-8 text-center text-muted-foreground">Generic Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["On-Chain Verification", true, false],
                                        ["AI Voice Capture", true, false],
                                        ["Web3 Wallet Login", true, false],
                                        ["Sentiment Heatmaps", true, false],
                                    ].map(([feat, us, them], i) => (
                                        <tr key={i} className="border-b border-border/50">
                                            <td className="py-4 font-medium">{feat}</td>
                                            <td className="py-4 text-center">
                                                {us ? <CheckCircle2 className="mx-auto text-brand-teal h-6 w-6" /> : <span className="text-muted-foreground">-</span>}
                                            </td>
                                            <td className="py-4 text-center">
                                                {them ? <CheckCircle2 className="mx-auto text-foreground h-6 w-6" /> : <span className="text-muted-foreground">-</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-center mt-12">
                            <Button size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white shadow-lg">
                                Sign Up to Experience the Difference
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
