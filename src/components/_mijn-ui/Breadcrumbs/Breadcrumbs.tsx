import * as React from "react";

import { LuChevronRight } from "react-icons/lu";

import { polymorphicForwardRef } from "../types/polymorphic";
import { cn } from "../utils";

const Breadcrumbs = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("flex flex-wrap items-center justify-start", "gap-1 text-muted-text", className)}
    aria-label="breadcrumb"
    {...props}
  />
));

Breadcrumbs.displayName = "Breadcrumbs";

const BreadcrumbsItem = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(
  ({ className, ...props }, ref) => <span ref={ref} className={cn("flex items-center text-xs", className)} {...props} />
);

BreadcrumbsItem.displayName = "BreadcrumbItem";

const BreadcrumbsLink = polymorphicForwardRef<"a", React.ComponentProps<"a">>(
  ({ renderAs: Component = "a", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("flex items-center text-muted-text hover:text-main-text hover:underline", className)}
        {...props}
      />
    );
  }
);

const BreadcrumbsSeparator = React.forwardRef<HTMLElement, React.ComponentProps<"span">>(
  ({ className, ...props }, ref) => (
    <span ref={ref} {...props} className={cn("h-3 w-3", className)}>
      <LuChevronRight className="h-full w-full" />
    </span>
  )
);

BreadcrumbsSeparator.displayName = "BreadcrumbsSeparator";

export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsSeparator };
