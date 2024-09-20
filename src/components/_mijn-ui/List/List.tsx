"use client";

import * as React from "react";

import { LuChevronDown } from "react-icons/lu";

import { ToggleProvider, useToggleContext } from "@/context/toggle-context";
import { useTransition } from "@/hooks/transition/use-transition";
import { polymorphicForwardRef } from "@/types/polymorphic";
import { cn } from "@/utils";
import { mergeRefs } from "@/utils/merge-refs";

import { buttonStyles } from "../Button";

const List = polymorphicForwardRef<"ul", React.ComponentProps<"ul">>(
  ({ renderAs: Component = "ul", className, ...props }, ref) => {
    return <Component ref={ref} className={cn("w-full list-none space-y-1 p-1", className)} {...props} />;
  }
);

List.displayName = "List";

const ListItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => {
  return <li ref={ref} className={cn("flex items-center gap-2 px-4 py-2 text-sm", className)} {...props} />;
});

ListItem.displayName = "ListItem";

const ListItemButton = polymorphicForwardRef<"button", { className?: string }>(
  ({ renderAs: Component = "button", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(buttonStyles({ variant: "ghost", className: "w-full gap-2" }), className)}
        {...props}
      />
    );
  }
);

const ListItemLeadingIcon = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted text-sm text-main-text [&>svg]:h-5 [&>svg]:w-5",
        className
      )}
      {...props}
    />
  )
);

ListItemLeadingIcon.displayName = "ListItemLeadingIcon";

const ListItemIcon = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("flex size-5 flex-shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4", className)}
      {...props}
    />
  );
});

ListItemIcon.displayName = "ListItemIcon";

const ListItemContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex-1 text-left", className)} {...props} />
);

ListItemContent.displayName = "ListItemContent";

const ListDivider = React.forwardRef<HTMLHRElement, React.ComponentProps<"hr">>(({ className, ...props }, ref) => (
  <hr ref={ref} className={cn("my-2 border-t border-main-border", className)} {...props} />
));

ListDivider.displayName = "ListDivider";

type ListSubMenuProps = {
  open?: boolean;
  onToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

const ListSubMenu = ({ open, onToggle, children }: ListSubMenuProps) => {
  return (
    <ToggleProvider isOpen={open} onToggle={onToggle}>
      {children}
    </ToggleProvider>
  );
};

const ListSubMenuTrigger = polymorphicForwardRef<"button", { className?: string; children?: React.ReactNode }>(
  ({ renderAs: Component = "button", children, className, ...props }, ref) => {
    const { toggle, isOpen } = useToggleContext();

    return (
      <Component
        ref={ref}
        onClick={() => toggle()}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "group inline-flex h-10 w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-text data-[state=open]:bg-primary data-[state=open]:text-primary-text data-[state=open]:hover:bg-primary data-[state=open]:hover:text-primary-text",
          className
        )}
        {...props}
      >
        {children}

        <span className={cn("transition group-data-[state=open]:rotate-180")}>
          <LuChevronDown className="h-4 w-4" />
        </span>
      </Component>
    );
  }
);

type ListSubMenuContentProps = {
  animateOnMount?: boolean;
} & React.ComponentProps<"ul">;

const ListSubMenuContent = React.forwardRef<HTMLUListElement, ListSubMenuContentProps>(
  ({ children, animateOnMount, className, ...props }, ref) => {
    const { isOpen } = useToggleContext();
    const innerRef = React.useRef<HTMLUListElement>(null);
    const { transitionStatus, isMounted } = useTransition(isOpen, 300, !!animateOnMount);

    if (!isMounted) return null;

    return (
      <ul
        ref={mergeRefs([innerRef, ref])}
        data-state={transitionStatus}
        className={cn("w-full origin-top overflow-hidden", className)}
        style={{
          height: transitionStatus === "open" ? innerRef?.current?.scrollHeight + "px" : "0px",
          transition: "height .3s ease-in-out",
        }}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

ListSubMenuContent.displayName = "ListSubMenuContent";

export {
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemIcon,
  ListItemLeadingIcon,
  ListSubMenu,
  ListSubMenuContent,
  ListSubMenuTrigger,
};
