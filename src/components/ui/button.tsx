"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "hero-cta-button group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border font-medium overflow-hidden whitespace-nowrap transition-colors duration-300 outline-none select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black border-black text-white",
        outline: "bg-transparent border-black text-black",
        secondary: "bg-white border-white text-black",
        ghost: "bg-transparent border-transparent text-black dark:text-white",
        destructive: "bg-transparent border-red-500 text-red-500",
        link: "text-black dark:text-white underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "px-4 py-1.5 lg:px-6 lg:py-2 text-[14px] lg:text-[16px]",
        sm: "px-3 py-1 lg:px-4 lg:py-1.5 text-[12px] lg:text-[14px]",
        lg: "px-6 py-2.5 lg:px-8 lg:py-3 text-[16px] lg:text-[18px]",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
        xs: "px-2 py-0.5 text-[10px]",
        "icon-xs": "size-6"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  noAnimation?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  noAnimation = false,
  children,
  ...props
}: ButtonProps) {
  const isSecondary = variant === "secondary";
  const shouldAnimate = !noAnimation && size !== "icon";

  if (!shouldAnimate) {
    return (
      <ButtonPrimitive
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative overflow-hidden group hover:opacity-90 transition-opacity"
        )}
        {...props}
      >
        {children}
      </ButtonPrimitive>
    );
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 rounded-t-full transition-all duration-1000 ease-out group-hover:w-[150%] group-hover:h-[300%]", isSecondary ? "bg-black" : "bg-white")}></span>
      <span className={cn("relative z-10 transition-colors duration-300 inline-flex items-center gap-2", isSecondary ? "group-hover:text-white" : "group-hover:text-black")}>
        {children}
      </span>
      <div className={cn("relative z-10 w-[14px] h-[14px] overflow-hidden transition-colors duration-300 flex-shrink-0", isSecondary ? "group-hover:text-white" : "group-hover:text-black")}>
        <svg className="absolute inset-0 transition-transform duration-1000 ease-in-out group-hover:translate-x-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
        <svg className="absolute inset-0 transition-transform duration-1000 ease-in-out -translate-x-full group-hover:translate-x-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </div>
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
