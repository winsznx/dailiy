"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, Info } from "lucide-react"

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Flexible Plans for Every Builder</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that fits your journey. From casual journaling to professional on-chain documentation.
                    </p>
                </div>

                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Free Tier */}
                        <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-2xl">Starter</CardTitle>
                                <CardDescription>For casual explorers</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">$0</span>
                                    <span className="text-muted-foreground">/mo</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Unlimited text entries",
                                        "5 Voice entries/month",
                                        "Basic on-chain sealing (Gas fees apply)",
                                        "Community Support"
                                    ].map((feat, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                            <span className="text-sm">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full" variant="outline">Get Started</Button>
                            </CardContent>
                        </Card>

                        {/* Pro Tier */}
                        <Card className="border-brand-teal shadow-2xl scale-105 relative overflow-hidden bg-background">
                            <div className="absolute top-0 right-0 bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                MOST POPULAR
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl">Pro</CardTitle>
                                <CardDescription>For serious builders</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">$9</span>
                                    <span className="text-muted-foreground">/mo</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Unlimited Voice & Text",
                                        "Advanced AI Analytics",
                                        "50 Gasless Seals/month",
                                        "Custom SBT Designs",
                                        "Priority Support"
                                    ].map((feat, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-brand-teal mr-2 shrink-0" />
                                            <span className="text-sm font-medium">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white">Choose Pro</Button>
                            </CardContent>
                        </Card>

                        {/* Enterprise Tier */}
                        <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all">
                            <CardHeader>
                                <CardTitle className="text-2xl">Enterprise</CardTitle>
                                <CardDescription>For teams & DAOs</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">Custom</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Collaborative Journals",
                                        "DAO Integration",
                                        "Dedicated API Access",
                                        "Custom Contracts",
                                        "24/7 Dedicated Support"
                                    ].map((feat, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-foreground mr-2 shrink-0" />
                                            <span className="text-sm">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full" variant="secondary">Contact Sales</Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FAQ Preview */}
                    <div className="mt-24 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                "What is an SBT?",
                                "Do I need to pay gas fees?",
                                "Can I export my data?"
                            ].map((q, i) => (
                                <div key={i} className="border-b border-border py-4">
                                    <h3 className="text-lg font-medium flex justify-between items-center cursor-pointer hover:text-brand-teal transition-colors">
                                        {q}
                                        <Info className="h-4 w-4 text-muted-foreground" />
                                    </h3>
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
