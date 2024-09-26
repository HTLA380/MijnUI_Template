import * as React from "react";

import { useControlledState } from "@/hooks/use-controlled-state";
import { polymorphicForwardRef } from "@/types/polymorphic";
import { cn } from "@/utils";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  FloatingTree,
  offset,
  OffsetOptions,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTransitionStyles,
  useTypeahead,
} from "@floating-ui/react";

import { buttonStyles } from "../Button";

/* -------------------------------------------------------------------------- */

type DropdownMenuContextValue = {
  modal?: boolean;

  context: ReturnType<typeof useFloating>["context"];

  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isNested: boolean;

  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  hasFocusInside: boolean;
  setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;

  refs: ReturnType<typeof useFloating>["refs"];
  labelsRef: React.MutableRefObject<(string | null)[]>;
  elementsRef: React.MutableRefObject<(HTMLButtonElement | null)[]>;

  floatingStyles: React.CSSProperties;

  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
};

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

const useDropdownMenuContext = () => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      "DropdownMenu components must be rendered within the Menu component",
    );
  }
  return context;
};

/* ------------------------------ DropdownMenu ------------------------------ */

interface DropdownMenuProps {
  open?: boolean;
  onToggle?: (isOpen: boolean) => void;
  placement?: Placement;
  offset?: OffsetOptions;
  children?: React.ReactNode;
  modal?: boolean;
}

export const DropdownMenu = ({ ...props }: DropdownMenuProps) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <DropdownMenuInner {...props} />
      </FloatingTree>
    );
  }

  return <DropdownMenuInner {...props} />;
};

const DropdownMenuInner = ({
  open,
  onToggle,
  placement = "bottom",
  children,
  offset: offsetValue,
  modal = false,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useControlledState(open, false, onToggle);

  const [hasFocusInside, setHasFocusInside] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const elementsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const labelsRef = React.useRef<Array<string | null>>([]);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();

  const isNested = parentId != null;

  const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? "right-start" : placement,
    strategy: "fixed",
    middleware: [
      offset(
        offsetValue || {
          mainAxis: isNested ? 0 : 4,
          alignmentAxis: isNested ? -4 : 0,
        },
      ),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });

  const click = useClick(context, {
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested,
  });

  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });

  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, listNavigation, typeahead],
  );

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  React.useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setIsOpen(false);
    }

    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId, setIsOpen]);

  React.useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("menuopen", { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  return (
    <FloatingNode id={nodeId}>
      <DropdownMenuContext.Provider
        value={{
          modal,

          context,
          isOpen,
          setIsOpen,
          isNested,

          activeIndex,
          setActiveIndex,
          hasFocusInside,
          setHasFocusInside,

          refs,
          labelsRef,
          elementsRef,

          floatingStyles,

          getItemProps,
          getReferenceProps,
          getFloatingProps,
        }}
      >
        {children}
      </DropdownMenuContext.Provider>
    </FloatingNode>
  );
};

/* --------------------------- DropdownMenuTrigger -------------------------- */

const DropdownMenuTrigger = polymorphicForwardRef<
  "button",
  React.ComponentProps<"button">
>(
  (
    { renderAs: Component = "button", className, children, ...props },
    forwardedRef,
  ) => {
    const item = useListItem();

    const {
      activeIndex,
      getItemProps,
      setHasFocusInside,
      refs,
      isNested,
      isOpen,
      hasFocusInside,
      getReferenceProps,
    } = useDropdownMenuContext();

    return (
      <Component
        ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
        tabIndex={!isNested ? undefined : activeIndex === item.index ? 0 : -1}
        role={isNested ? "menuitem" : undefined}
        data-state={isOpen ? "open" : "closed"}
        data-nested={isNested ? "" : undefined}
        data-focus-inside={hasFocusInside ? "" : undefined}
        className={cn(
          buttonStyles({ variant: isNested ? "ghost" : "outline" }),
          "data-[open]:bg-accent data-[open]:text-accent-text",
          className,
        )}
        {...getReferenceProps(
          getItemProps({
            ...props,
            onFocus(event: React.FocusEvent<HTMLButtonElement>) {
              props.onFocus?.(event);
              setHasFocusInside(false);
              setHasFocusInside(true);
            },
            onClick(event) {
              event.stopPropagation();
            },
          }),
        )}
      >
        {children}
      </Component>
    );
  },
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/* --------------------------- DropdownMenuContent -------------------------- */

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, style, ...props }, forwardedRef) => {
  const {
    modal,
    refs,
    isNested,
    context,
    getFloatingProps,
    floatingStyles,
    labelsRef,
    elementsRef,
  } = useDropdownMenuContext();

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
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
  });

  return (
    <FloatingList labelsRef={labelsRef} elementsRef={elementsRef}>
      {isMounted && (
        <FloatingPortal>
          <FloatingOverlay
            lockScroll
            style={{ zIndex: 999999 }}
            onClick={(e) => e.stopPropagation()}
          >
            <FloatingFocusManager
              context={context}
              modal={modal}
              initialFocus={isNested ? -1 : 0}
              returnFocus={!isNested}
            >
              <div
                ref={refs.setFloating}
                style={{ ...floatingStyles, zIndex: 999999 }}
                className="isolate outline-none"
                {...getFloatingProps()}
              >
                <div
                  className={cn(
                    "flex flex-col rounded-md border border-main-border bg-surface p-1 text-surface-text shadow-lg outline-none",
                    className,
                  )}
                  style={{ ...transitionStyles, ...style }}
                  ref={forwardedRef}
                  {...props}
                >
                  {children}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </FloatingList>
  );
});

DropdownMenuContent.displayName = "DropdownMenuContent";

/* ---------------------------- DropdownMenuItem ---------------------------- */

export const DropdownMenuItem = polymorphicForwardRef<
  "button",
  React.ComponentProps<"button"> & { label: string }
>(
  (
    {
      renderAs: Component = "button",
      className,
      disabled,
      label,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const menu = useDropdownMenuContext();
    const item = useListItem({ label: disabled ? null : label });
    const tree = useFloatingTree();
    const isActive = item.index === menu.activeIndex;

    return (
      <Component
        {...props}
        ref={useMergeRefs([item.ref, forwardedRef])}
        type="button"
        role="menuitem"
        className={cn(
          "flex w-full items-center justify-start rounded-default px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-text",
          className,
        )}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        {...menu.getItemProps({
          onClick(event: React.MouseEvent<HTMLButtonElement>) {
            tree?.events.emit("click");
            props.onClick?.(event);
          },
          onFocus(event: React.FocusEvent<HTMLButtonElement>) {
            props.onFocus?.(event);
            menu.setHasFocusInside(true);
          },
        })}
      >
        {children}
      </Component>
    );
  },
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenuTrigger, useDropdownMenuContext };
