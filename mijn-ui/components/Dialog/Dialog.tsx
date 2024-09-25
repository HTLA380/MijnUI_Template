"use client";

import * as React from "react";

import { polymorphicForwardRef } from "@/types/polymorphic";
import { cn } from "@/utils";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useId,
  useMergeRefs,
  useTransitionStyles,
} from "@floating-ui/react";

import { ButtonPropsWithVariant, buttonStyles } from "../Button";
import { DialogOptions } from "./types";
import { useDialog, useDialogReturnType } from "./use-dialog";

type ContextType =
  | (ReturnType<typeof useDialog> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;

const DialogContext = React.createContext<ContextType>(null);

const useDialogContext = (): useDialogReturnType => {
  const context = React.useContext(DialogContext);

  if (context == null) {
    throw new Error("Dialog components must be wrapped in <Dialog />");
  }

  return context;
};

const Dialog = ({
  children,
  ...options
}: {
  children: React.ReactNode;
} & DialogOptions) => {
  const dialog = useDialog(options);

  return (
    <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
  );
};

const DialogTrigger = polymorphicForwardRef<
  "button",
  React.ComponentProps<"button">
>(
  (
    { renderAs: Component = "button", children, className, ...props },
    propRef,
  ) => {
    const context = useDialogContext();
    const ref = useMergeRefs([context.refs.setReference, propRef]);

    return (
      <Component
        ref={ref}
        className={cn(buttonStyles({ variant: "outline", className }))}
        data-state={context.open ? "open" : "closed"}
        {...context.getReferenceProps(props)}
      >
        {children}
      </Component>
    );
  },
);

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ style, className, ...props }, propRef) => {
  const { context: floatingContext, ...context } = useDialogContext();

  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    floatingContext,
    {
      common: {
        transformOrigin: "top",
      },
      initial: {
        opacity: 0,
        transform: "scale(0.8)",
      },
      open: {
        opacity: 1,
        transform: "scale(1)",
      },
      close: {
        opacity: 0,
        transform: "scale(0.8)",
      },
    },
  );

  const { styles: overlayTransitionStyles } = useTransitionStyles(
    floatingContext,
    {
      initial: {
        opacity: 0,
      },
      open: {
        opacity: 1,
      },
      close: {
        opacity: 0,
      },
    },
  );

  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!isMounted) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay
        className="duration z-10 flex items-center justify-center bg-black/80"
        style={{ ...overlayTransitionStyles, zIndex: 9999999 }}
        lockScroll
      >
        <FloatingFocusManager context={{ ...floatingContext }}>
          <div
            ref={ref}
            className={cn(
              "m-4 w-full max-w-md rounded-xl bg-surface p-6 shadow-lg",
              className,
            )}
            style={{ ...transitionStyles, ...style, zIndex: 9999999 }}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

DialogContent.displayName = "DialogContent";

const DialogTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { setLabelId } = useDialogContext();
  const id = useId();

  // Only sets `aria-labelledby` on the Dialog root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <h3
      {...props}
      ref={ref}
      id={id}
      className={cn("text-lg font-semibold", className)}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => {
  const { setDescriptionId } = useDialogContext();
  const id = useId();

  // Only sets `aria-describedby` on the Dialog root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <p
      {...props}
      ref={ref}
      id={id}
      className={cn("text-sm text-accent-text", className)}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mt-6 flex items-center justify-end gap-2", className)}
      {...props}
    />
  );
});

DialogFooter.displayName = "DialogFooter";

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
});

DialogHeader.displayName = "DialogHeader";

/* --------------------------- Unstyled Buttons -------------------------- */

const DialogClose = polymorphicForwardRef<"button", ButtonPropsWithVariant>(
  (
    {
      renderAs: Component = "button",
      size,
      variant = "outline",
      className,
      ...props
    },
    ref,
  ) => {
    const { setOpen } = useDialogContext();

    return (
      <Component
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setOpen(false);
          props.onClick?.(e);
        }}
        ref={ref}
        className={cn(buttonStyles({ variant, size, className }))}
        {...props}
      />
    );
  },
);

DialogClose.displayName = "DialogClose";

/* -------------------------------------------------------------------------- */

const DialogAction = polymorphicForwardRef<"button", ButtonPropsWithVariant>(
  (
    { renderAs: Component = "button", size, variant, className, ...props },
    ref,
  ) => {
    const { setOpen } = useDialogContext();

    return (
      <Component
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setOpen(false);
          props.onClick?.(e);
        }}
        ref={ref}
        className={cn(buttonStyles({ variant, size, className }))}
        {...props}
      />
    );
  },
);

DialogAction.displayName = "DialogAction";

export {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useDialogContext,
};
