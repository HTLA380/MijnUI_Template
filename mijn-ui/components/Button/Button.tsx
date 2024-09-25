import { cva, VariantProps } from "class-variance-authority";

import { polymorphicForwardRef } from "@/types/polymorphic";
import { cn } from "@/utils";

export const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-1 rounded-md text-sm disabled:bg-disabled disabled:text-disabled-text",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-text hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-text hover:bg-secondary/90",
        outline:
          "border border-main-border hover:bg-accent hover:text-accent-text",
        danger: "bg-danger text-danger-text hover:bg-danger/90",
        ghost: "hover:bg-accent hover:text-accent-text",
        surface: "bg-surface text-surface-text hover:bg-surface/90",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-3 py-2",
        lg: "h-11 px-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonPropsWithVariant = VariantProps<typeof buttonStyles> &
  React.ComponentProps<"button">;

const Button = polymorphicForwardRef<"button", ButtonPropsWithVariant>(
  (
    { renderAs: Component = "button", size, variant, className, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(buttonStyles({ variant, size, className }))}
        {...props}
      />
    );
  },
);

export { Button };
