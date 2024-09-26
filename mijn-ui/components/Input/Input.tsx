import * as React from "react";

import { polymorphicForwardRef } from "@/types/polymorphic";
import { cn } from "@/utils";

type InputProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
} & React.ComponentProps<"input">;

const Input = polymorphicForwardRef<"input", InputProps>(
  (
    {
      renderAs: Component = "input",
      startIcon,
      endIcon,
      className,
      disabled,
      id,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const inputId = id || React.useId();

    return (
      <div
        className={cn(
          "relative flex w-full items-center gap-1 rounded-md border border-main-border bg-surface p-2.5 text-sm focus-within:border-input-border focus-within:ring-1 focus-within:ring-input-border",
          {
            "cursor-not-allowed placeholder:text-muted-text": disabled,
            "cursor-default bg-accent": readOnly,
          },
          className,
        )}
      >
        {startIcon && (
          <label
            htmlFor={inputId}
            className={cn(disabled ? "cursor-not-allowed" : "cursor-text")}
          >
            {startIcon}
          </label>
        )}

        <Component
          ref={ref}
          className={cn(
            "h-full w-full border-none bg-transparent outline-none",
            {
              "cursor-not-allowed": disabled,
              "cursor-default": readOnly,
            },
          )}
          disabled={disabled}
          id={inputId}
          {...props}
        />

        {endIcon && <span>{endIcon}</span>}
      </div>
    );
  },
);

export { Input };
