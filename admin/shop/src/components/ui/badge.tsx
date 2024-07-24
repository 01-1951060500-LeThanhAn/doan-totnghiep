import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#EBCF8D] text-yellow-600 hover:bg-primary/80",
        secondary: "bg-[#BCDED0] text-[#1B925E]",
        destructive: "border-transparent bg-[#F7DDD8] text-[#B71D18]",
        outline: "bg-[#3F625B] text-[#77ED8B]",
        pending: "bg-[#89bdf4] text-[#2e4787]",
        remain: "bg-[#df7417] text-[#fff]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
