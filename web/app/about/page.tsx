"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Users, History, Award } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Hero */}
                    <div className="text-center mb-24">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Built by Web3 Builders, for Web3 Builders</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            We're on a mission to create the operating system for thought in the decentralized world.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="grid md:grid-cols-3 gap-12 mb-32">
                        <div className="text-center p-6">
                            <div className="mx-auto w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal mb-6">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                            <p className="text-muted-foreground">We believe software should be beautiful, fast, and intuitive.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="mx-auto w-16 h-16 bg-brand-navy/10 dark:bg-brand-navy/60 rounded-full flex items-center justify-center text-brand-navy dark:text-white mb-6">
                                <History size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">On-Chain Verifiability</h3>
                            <p className="text-muted-foreground">Your thoughts are your asset. We help you prove ownership immutably.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500 mb-6">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">User-Centric</h3>
                            <p className="text-muted-foreground">Designed for the unique workflows of developers, traders, and creators.</p>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="mb-32">
                        <h2 className="text-3xl font-bold text-center mb-12">The Team</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="text-center">
                                    <div className="w-32 h-32 mx-auto bg-muted rounded-full mb-4 grayscale hover:grayscale-0 transition-all"></div>
                                    <h4 className="font-bold">Member Name</h4>
                                    <p className="text-sm text-muted-foreground">Role / Title</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
                        <div className="space-y-8 border-l-2 border-border ml-4 pl-8 relative">
                            {[
                                { year: "2025 Q3", title: "Project Inception", desc: "The idea for Dailiy was born during a hackathon." },
                                { year: "2025 Q4", title: "Base Integration", desc: "Official launch on the Base L2 network." },
                                { year: "2026 Q1", title: "V1 Launch", desc: "Public release with premium features." },
                            ].map((item, i) => (
                                <div key={i} className="relative">
                                    <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-brand-teal"></span>
                                    <span className="text-sm text-brand-teal font-bold mb-1 block">{item.year}</span>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
