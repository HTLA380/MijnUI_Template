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

import { buttonStyles } from "../Button";
import { PopoverOptions } from "./types";
import { usePopover, usePopoverReturnType } from "./use-popover";

type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;

const PopoverContext = React.createContext<ContextType>(null);

const usePopoverContext = (): usePopoverReturnType => {
  const context = React.useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

const Popover = ({
  children,
  modal = false,
  ...restOptions
}: {
  children: React.ReactNode;
} & PopoverOptions) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = polymorphicForwardRef<
  "button",
  React.ComponentProps<"button">
>(({ renderAs: Component = "button", children, className, ...props }, ref) => {
  const context = usePopoverContext();

  return (
    <Component
      ref={useMergeRefs([context.refs.setReference, ref])}
      className={cn(buttonStyles({ variant: "outline", className }))}
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </Component>
  );
});

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function PopoverContent({ style, className, ...props }, propRef) {
  const { context: floatingContext, ...context } = usePopoverContext();

  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    floatingContext,
    {
      common: ({ side }) => ({
        transformOrigin: {
          top: "bottom",
          bottom: "top",
          left: "right",
          right: "left",
        }[side],
      }),
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

  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!isMounted) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay
        lockScroll
        style={{ zIndex: 999999 }}
        onClick={(e) => e.stopPropagation()}
      >
        <FloatingFocusManager context={floatingContext} modal={context.modal}>
          <div
            style={{ ...context.floatingStyles, zIndex: 999999 }}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
          >
            <div
              ref={ref}
              className={cn(
                "rounded-md border border-main-border p-2",
                className,
              )}
              style={{ ...transitionStyles, ...style }}
              {...props}
            >
              {props.children}
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

/* ------------------------- TODO: Apply styles. ------------------------- */

const PopoverTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(function PopoverHeading(props, ref) {
  const { setLabelId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-labelledby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return <h3 className="text-base font-medium" {...props} ref={ref} id={id} />;
});

const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLProps<HTMLParagraphElement>
>(function PopoverDescription(props, ref) {
  const { setDescriptionId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-describedby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return <p className="text-sm text-muted-text" {...props} ref={ref} id={id} />;
});

const PopoverClose = polymorphicForwardRef<
  "button",
  React.ComponentProps<"button">
>(({ renderAs: Component = "button", className, ...props }, ref) => {
  const { setOpen } = usePopoverContext();

  return (
    <Component
      type="button"
      ref={ref}
      {...props}
      className={cn("", className)}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(event);
        setOpen(false);
      }}
    />
  );
});

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  usePopoverContext,
};
