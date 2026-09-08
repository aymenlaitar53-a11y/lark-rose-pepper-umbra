import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,box-shadow] duration-150 ease-out select-none disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "bg-forest text-ivory hover:bg-forest-deep",
        ghost: "bg-transparent text-ivory hover:bg-ivory/10",
        outline: "bg-transparent text-ink hover:bg-paper",
        ivory: "bg-ivory text-ink hover:bg-cream",
      },
      size: {
        default: "h-11 rounded-full px-5 text-sm",
        sm: "h-9 rounded-full px-4 text-sm",
        icon: "size-11 rounded-full",
        pill: "h-10 rounded-full px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
