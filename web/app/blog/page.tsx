"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
    const posts = [
        {
            title: "5 Tips for On-Chain Journaling in Web3",
            excerpt: "How to effectively document your journey and build a verifiable reputation.",
            author: "Alex D.",
            date: "Dec 12, 2024",
            category: "Education"
        },
        {
            title: "Why Soulbound Tokens Matter for Creators",
            excerpt: "Understanding the value of non-transferable identity tokens in the creator economy.",
            author: "Sarah J.",
            date: "Dec 10, 2024",
            category: "Web3"
        },
        {
            title: "Dailiy V1.0 Release Notes",
            excerpt: "Everything new in our latest major update. Dark mode, voice V2, and more.",
            author: "Team Dailiy",
            date: "Dec 05, 2024",
            category: "Product"
        }
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Dailiy Log</h1>
                        <p className="text-muted-foreground text-lg">Insights, updates, and thoughts from our team.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-12">
                        {/* Sidebar */}
                        <aside className="space-y-8">
                            <div>
                                <h3 className="font-bold mb-4">Categories</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {["All", "Product", "Education", "Web3", "Engineering"].map(cat => (
                                        <li key={cat}><a href="#" className="hover:text-primary transition-colors">{cat}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4">Newsletter</h3>
                                <p className="text-xs text-muted-foreground mb-4">Get the latest updates directly to your inbox.</p>
                                <input type="email" placeholder="Email" className="w-full h-10 px-3 rounded-md border border-input bg-background mb-2 text-sm" />
                                <button className="w-full h-10 rounded-md bg-brand-navy dark:bg-white text-white dark:text-black text-sm font-medium">Subscribe</button>
                            </div>
                        </aside>

                        {/* Posts */}
                        <div className="md:col-span-3 space-y-8">
                            {posts.map((post, i) => (
                                <Link key={i} href="#" className="block group">
                                    <Card className="overflow-hidden border-border/50 transition-all hover:border-brand-teal/50">
                                        <div className="grid md:grid-cols-3">
                                            <div className="bg-muted aspect-video md:aspect-auto"></div>
                                            <div className="col-span-2 p-6">
                                                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-3">
                                                    <span className="text-brand-teal font-medium">{post.category}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {post.date}</span>
                                                </div>
                                                <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-teal transition-colors">{post.title}</h2>
                                                <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                                                <p className="text-sm font-medium">{post.author}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
