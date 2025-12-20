"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { useAccount } from "wagmi"

export function Navbar() {
    const pathname = usePathname()
    const { isConnected } = useAccount()
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const links = [
        { href: "/", label: "Home" },
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
    ]

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 border-b",
            isScrolled ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm" : "bg-transparent border-transparent"
        )}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight text-foreground transition-opacity hover:opacity-80">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-navy to-brand-teal flex items-center justify-center text-white font-bold shadow-lg">
                        D
                    </div>
                    <span className="hidden sm:inline-block">Dailiy</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />

                    {/* Reown AppKit Button */}
                    <div className="hidden md:flex items-center space-x-2">

                        <w3m-button />

                        {isConnected && (
                            <Button variant="ghost" className="text-sm" asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
