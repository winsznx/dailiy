import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    // User request: Rounded corners (8px radius) -> rounded-lg
                    "rounded-lg",

                    // Variants
                    variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all",
                    variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
                    variant === "link" && "text-primary underline-offset-4 hover:underline",

                    // Sizes
                    size === "default" && "h-10 px-4 py-2",
                    size === "sm" && "h-9 rounded-md px-3",
                    size === "lg" && "h-12 rounded-md px-8 text-base",
                    size === "icon" && "h-10 w-10",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
