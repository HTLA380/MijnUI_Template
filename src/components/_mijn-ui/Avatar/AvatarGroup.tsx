import * as React from "react";

import { VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

import { avatarStyles } from "./Avatar";

type AvatarGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarStyles> & {
    max?: number;
  };

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, children, className, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const remainingChildrenCount = max ? childArray.length - max : 0;

    return (
      <div className={cn("flex items-center justify-center -space-x-2", className)} {...props} ref={ref}>
        {visibleChildren}
        {remainingChildrenCount > 0 && (
          <div className={"!ml-1.5 flex items-center justify-center text-xs text-muted-text"}>
            +{remainingChildrenCount}
          </div>
        )}
      </div>
    );
  }
);

export { AvatarGroup };

AvatarGroup.displayName = "AvatarGroup";
