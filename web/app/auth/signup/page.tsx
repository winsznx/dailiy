"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export default function SignupPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow flex items-center justify-center pt-16 pb-16 px-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Create an account</h1>
                        <p className="text-muted-foreground mt-2">Enter your email below to create your account</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="name">Full Name</label>
                            <input type="text" id="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                            <input type="email" id="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="name@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                            <input type="password" id="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                        </div>

                        <Button className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white" asChild>
                            <Link href="/dashboard">Create Account</Link>
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                            <Github className="mr-2 h-4 w-4" /> Github
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Twitter className="mr-2 h-4 w-4" /> Twitter
                        </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account? <Link href="/auth/login" className="text-brand-teal hover:underline">Log in</Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
