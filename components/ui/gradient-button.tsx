"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gradientButtonVariants = cva(
  [
    "gradient-button",
    "inline-flex items-center justify-center gap-2",
    "rounded-[11px] min-w-[132px] px-9 py-4",
    "text-base leading-[19px] font-[500] text-white",
    "font-sans font-bold",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "",
        variant: "gradient-button-variant",
        rose: "gradient-button-rose",
        amber: "gradient-button-amber",
        cobalt: "gradient-button-cobalt",
        emerald: "gradient-button-emerald",
      },
      size: {
        default: "",
        sm: "!min-w-0 !px-4 !py-2 !text-xs !leading-tight !rounded-lg",
        md: "!min-w-0 !px-5 !py-2.5 !text-sm !leading-tight !rounded-xl",
        lg: "!min-w-[140px] !px-8 !py-3.5 !text-base !rounded-xl",
        full: "!w-full !min-w-0 !px-6 !py-3.5 !text-sm !rounded-xl",
        icon: "!min-w-0 !p-2.5 !rounded-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton, gradientButtonVariants }
