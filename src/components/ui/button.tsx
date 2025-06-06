import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-foreground shadow-pixel hover:shadow-pixel-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-pixel-active [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive shadow-[2px_2px_0px_hsl(var(--destructive))] hover:shadow-[3px_3px_0px_hsl(var(--destructive))] active:shadow-[1px_1px_0px_hsl(var(--destructive))]",
        outline:
          "border-foreground bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-secondary-foreground shadow-[2px_2px_0px_hsl(var(--secondary-foreground))] hover:shadow-[3px_3px_0px_hsl(var(--secondary-foreground))] active:shadow-[1px_1px_0px_hsl(var(--secondary-foreground))]",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none border-transparent active:shadow-none active:translate-x-0 active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline shadow-none border-transparent active:shadow-none active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
