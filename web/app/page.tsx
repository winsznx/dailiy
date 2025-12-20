"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mic, ShieldCheck, BarChart3, Quote, Play } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
          {/* Abstract Background */}
          <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "var(--color-brand-navy)", stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: "var(--color-brand-teal)", stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <g fill="none" stroke="currentColor" strokeWidth="0.1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <path key={i} d={`M${i * 5} 100 Q${50 + i} 50 ${100 - i * 5} 0`} className="text-brand-teal" />
                ))}
              </g>
            </svg>
          </div>

          <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 bg-brand-teal/10 text-brand-teal px-3 py-1 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
              </span>
              <span>v1.0 Now Live on Base</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl animate-fade-in-up [animation-delay:200ms]">
              Capture Your Web3 Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-teal dark:from-brand-teal dark:to-white">On-Chain</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              The premium SaaS for builders who value verifiable thoughts and insights.
              Effortless voice journaling sealed as Soulbound Tokens.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up [animation-delay:600ms]">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-brand-teal/20" asChild>
                <Link href="/auth/signup">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full backdrop-blur-sm" asChild>
                <Link href="#demo"><Play className="mr-2 h-4 w-4 fill-current" /> Watch Demo</Link>
              </Button>
            </div>

            {/* Mock Dashboard Representation */}
            <div className="mt-16 w-full max-w-5xl md:rounded-xl md:border md:border-border/50 md:shadow-2xl overflow-hidden animate-fade-in-up [animation-delay:800ms] bg-card/50 backdrop-blur-xl">
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black relative flex items-center justify-center group cursor-default">
                {/* Placeholder Content simulating UI */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Top Bar */}
                  <div className="h-12 border-b border-border/10 flex items-center px-4 justify-between bg-background/40">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="h-6 w-32 bg-muted/20 rounded-md"></div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 flex">
                    {/* Sidebar */}
                    <div className="w-16 md:w-64 border-r border-border/10 p-4 space-y-4 hidden sm:block bg-background/20">
                      <div className="h-8 w-3/4 bg-muted/20 rounded-md mb-8"></div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-6 w-full bg-muted/10 rounded-md"></div>)}
                      </div>
                    </div>
                    {/* Main */}
                    <div className="flex-1 p-8">
                      <div className="h-10 w-1/2 bg-muted/30 rounded-lg mb-6"></div>
                      <div className="space-y-3">
                        <div className="h-4 w-full bg-muted/20 rounded"></div>
                        <div className="h-4 w-full bg-muted/20 rounded"></div>
                        <div className="h-4 w-3/4 bg-muted/20 rounded"></div>
                      </div>
                      <div className="mt-8 flex space-x-4">
                        <div className="h-32 w-full bg-muted/10 rounded-xl border border-border/20 flex items-center justify-center flex-col text-muted-foreground">
                          <Mic className="h-8 w-8 mb-2 opacity-50" />
                          <span className="text-xs">Voice Entry Processing...</span>
                        </div>
                        <div className="h-32 w-full bg-muted/10 rounded-xl border border-border/20 flex items-center justify-center flex-col text-muted-foreground">
                          <ShieldCheck className="h-8 w-8 mb-2 text-brand-teal opacity-80" />
                          <span className="text-xs">Sealed on Base</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need to Build & Document</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dailiy provides the tools to capture your journey, verifiable on-chain.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-background border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 text-center flex flex-col items-center">
                  <div className="p-4 rounded-full bg-brand-teal/10 text-brand-teal mb-6">
                    <Mic size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Frictionless Voice Capture</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Speak your mind. Our AI instantly transcribes and organizes your thoughts into structured journals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 text-center flex flex-col items-center">
                  <div className="p-4 rounded-full bg-brand-navy/10 dark:bg-brand-navy/60 text-brand-navy dark:text-white mb-6">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Proof-of-Thought SBTs</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Seal your best ideas as Soulbound Tokens on Base. Create an immutable record of your intellectual property.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 text-center flex flex-col items-center">
                  <div className="p-4 rounded-full bg-purple-500/10 text-purple-500 mb-6">
                    <BarChart3 size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Sentiment Analytics</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Visualize your productivity and emotional state with AI-driven heatmaps and insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Web3 Builders</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { q: "Dailiy has completely changed how I document my trading strategies. The voice capture is seamless.", u: "Alex R.", r: "DeFi Trader" },
                { q: "Finally, a way to prove my contribution to early protocol discussions. The SBTs are a game changer.", u: "Sarah K.", r: "Protocol Dev" },
                { q: "The design is incredibly slick. It feels like using Linear but for my personal thoughts.", u: "James L.", r: "Product Designer" }
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-xl bg-muted/20 border border-border/20">
                  <Quote className="h-8 w-8 text-brand-teal/50 mb-4" />
                  <p className="text-lg mb-6 font-medium">"{t.q}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-400 to-gray-600"></div>
                    <div>
                      <p className="font-bold text-sm">{t.u}</p>
                      <p className="text-xs text-muted-foreground">{t.r}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to seal your ideas on-chain?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Join thousands of builders using Dailiy to secure their intellectual journey.</p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-teal" />
              <Button size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white border-none h-12 px-8">Sign Up</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
