import * as React from "react";

import { useControlledState } from "@/hooks/use-controlled-state";
import { polymorphicForwardRef } from "@/types/polymorphic";
import { cn } from "@/utils";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingOverlay,
  FloatingPortal,
  offset,
  OffsetOptions,
  Placement,
  useClick,
  useDismiss,
  useFloating,
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

type SelectContextValue = {
  onSelect?: (index: number) => void;
  activeIndex: number | null;
  selectedIndex: number | null;
  floatingStyles: React.CSSProperties;
  handleSelect: (index: number | null) => void;
  context: ReturnType<typeof useFloating>["context"];
  selectedLabel: string | null;
  refs: ReturnType<typeof useFloating>["refs"];
  elementsRef: React.MutableRefObject<Array<HTMLElement | null>>;
  labelsRef: React.MutableRefObject<Array<string | null>>;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
};

// Create the context
const SelectContext = React.createContext<SelectContextValue>(
  {} as SelectContextValue,
);

/* --------------------------------- Select --------------------------------- */

type SelectProps = {
  open?: boolean;
  onToggle?: (isOpen: boolean) => void;
  onSelect?: (index: number) => void;
  defaultSelectedIndex?: number;
  defaultSelectedLabel?: string;
  children: React.ReactNode;
  placement?: Placement;
  offset?: OffsetOptions;
};

// Select component to manage state and provide context
const Select = ({
  open,
  onToggle,
  onSelect,
  children,
  defaultSelectedIndex,
  defaultSelectedLabel,
  placement = "bottom",
  offset: offsetValue,
}: SelectProps) => {
  // State management
  const [isOpen, setIsOpen] = useControlledState(open, false, onToggle);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(
    defaultSelectedIndex ?? null,
  );
  const [selectedLabel, setSelectedLabel] = React.useState<string | null>(
    defaultSelectedLabel ?? null,
  );

  // Initialize floating UI
  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(offsetValue || 5), flip()],
    strategy: "fixed",
  });

  // Refs to store elements and labels
  const elementsRef = React.useRef<Array<HTMLElement | null>>([]);
  const labelsRef = React.useRef<Array<string | null>>([]);

  // Handle selection of an item
  const handleSelect = React.useCallback(
    (index: number | null) => {
      setSelectedIndex(index);
      setIsOpen(false);
      if (index !== null) {
        setSelectedLabel(labelsRef.current[index]!);
      }
    },
    [setIsOpen],
  );

  // Handle typeahead match
  function handleTypeaheadMatch(index: number | null) {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }

  // Initialize interactions
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNav, typeahead, click, dismiss, role],
  );

  // Memoize context value
  const selectContext = React.useMemo(
    () => ({
      onSelect,

      context,
      activeIndex,
      selectedIndex,
      selectedLabel,
      refs,
      labelsRef,
      elementsRef,
      floatingStyles,
      handleSelect,
      getItemProps,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      onSelect,

      context,
      activeIndex,
      selectedIndex,
      selectedLabel,
      refs,
      labelsRef,
      elementsRef,
      floatingStyles,
      handleSelect,
      getItemProps,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return (
    <SelectContext.Provider value={selectContext}>
      {children}
    </SelectContext.Provider>
  );
};

/* ------------------------------ SelectTrigger ----------------------------- */

type SelectTriggerProps = {
  children?:
    | React.ReactNode
    | ((props: { selectedLabel: string | null }) => React.ReactNode);
} & Omit<React.ComponentProps<"button">, "children">;

const SelectTrigger = polymorphicForwardRef<"button", SelectTriggerProps>(
  ({ renderAs: Component = "button", children, className, ...props }, ref) => {
    const { refs, getReferenceProps, selectedLabel } =
      React.useContext(SelectContext);

    return (
      <Component
        className={cn(buttonStyles({ variant: "outline", className }))}
        ref={useMergeRefs([ref, refs.setReference])}
        tabIndex={0}
        {...getReferenceProps({
          onClick: (event) => {
            event.stopPropagation();
          },
        })}
        {...props}
      >
        {typeof children === "function"
          ? children({ selectedLabel })
          : children}
      </Component>
    );
  },
);

/* ------------------------------ SelectContent ----------------------------- */

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  const {
    context,
    elementsRef,
    labelsRef,
    refs,
    floatingStyles,
    getFloatingProps,
  } = React.useContext(SelectContext);

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

  if (!isMounted) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay
        lockScroll
        style={{ zIndex: 999999 }}
        onClick={(e) => e.stopPropagation()}
      >
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: 999999 }}
            {...getFloatingProps()}
            className="outline-none"
          >
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              <div
                ref={ref}
                style={{ ...transitionStyles }}
                className={cn(
                  "flex flex-col items-start rounded-md border border-main-border bg-surface p-1 shadow-sm outline-none",
                  className,
                )}
                {...props}
              >
                {children}
              </div>
            </FloatingList>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

SelectContent.displayName = "SelectContent";

/* ------------------------------ SelectOption ------------------------------ */

type SelectOptionProps = {
  value: string;
} & React.ComponentProps<"button">;

const SelectOption = polymorphicForwardRef<"button", SelectOptionProps>(
  (
    { renderAs: Component = "button", className, value, children, ...props },
    ref,
  ) => {
    const { activeIndex, selectedIndex, getItemProps, handleSelect, onSelect } =
      React.useContext(SelectContext);

    const { ref: ListRef, index } = useListItem({ label: value });

    const isActive = activeIndex === index;
    const isSelected = selectedIndex === index;

    return (
      <Component
        ref={useMergeRefs([ref, ListRef])}
        role="option"
        data-selected={isSelected ? "" : undefined}
        data-active={isActive ? "" : undefined}
        className={cn(
          "flex w-full items-center justify-start rounded-default px-3 py-2 text-sm outline-none data-[active]:bg-accent data-[selected]:bg-accent data-[selected]:data-[active]:bg-accent/80",
          className,
        )}
        aria-selected={isActive && isSelected}
        tabIndex={isActive ? 0 : -1}
        {...getItemProps({
          onClick: () => {
            handleSelect(index);
            onSelect?.(index);
          },
        })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

export { Select, SelectContent, SelectOption, SelectTrigger };
