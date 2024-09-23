import * as React from "react";

import { cva, VariantProps } from "class-variance-authority";
import { LuCheck } from "react-icons/lu";

import { cn } from "@/utils";

export const checkboxStyles = cva(
  [
    "before:content[''] w-5 h-5 peer relative cursor-pointer disabled:cursor-default appearance-none rounded-[4px] disabled:checked:bg-disabled disabled:border-disabled border border-main-text transition-all",
  ],
  {
    variants: {
      variant: {
        primary:
          "indeterminate:border-primary indeterminate:bg-primary [&+span>svg]:text-primary-text checked:border-primary checked:bg-primary",
        secondary:
          "indeterminate:border-secondary indeterminate:bg-secondary [&+span>svg]:text-secondary-text checked:border-secondary checked:bg-secondary",
        outline: "[&+span>svg]:text-main-text",
        danger:
          "indeterminate:border-danger indeterminate:bg-danger [&+span>svg]:text-danger-text checked:border-danger checked:bg-danger",
        success:
          "indeterminate:border-success indeterminate:bg-success [&+span>svg]:text-success-text checked:border-success checked:bg-success",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type CheckboxProps = React.ComponentProps<"input"> &
  VariantProps<typeof checkboxStyles>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ variant, id = React.useId(), className, ...props }, ref) => {
    return (
      <label htmlFor={id} className="relative flex items-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(checkboxStyles({ variant, className }))}
          {...props}
        />
        <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity peer-checked:opacity-100 peer-disabled:[&>svg]:text-disabled-text">
          <LuCheck className="h-4 w-4" />
        </span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
