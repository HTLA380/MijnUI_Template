import * as React from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  UseFloatingReturn,
  useInteractions,
  UseInteractionsReturn,
  useRole,
} from "@floating-ui/react";

import { useControlledState } from "@/hooks/use-controlled-state";

import { PopoverOptions } from "./types";

// Explicitly defining the return type of this hook is necessary to avoid TypeScript's issue with inferred types,
// as described in: "https://github.com/microsoft/TypeScript/issues/29808"
// additionally you can see the explanation here "https://github.com/microsoft/TypeScript/pull/58176#issuecomment-2052698294"

export type usePopoverReturnType = UseFloatingReturn &
  UseInteractionsReturn & {
    open: boolean;
    setOpen: (open: boolean) => void;
    modal?: boolean;
    labelId?: string;
    descriptionId?: string;
    setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
  };

const usePopover = ({
  initialOpen = false,
  placement = "bottom",
  modal,
  open: controlledOpen,
  onToggle: setControlledOpen,
}: PopoverOptions = {}): usePopoverReturnType => {
  const [open, setOpen] = useControlledState(
    controlledOpen,
    initialOpen,
    setControlledOpen,
  );

  const [labelId, setLabelId] = React.useState<string | undefined>();

  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId],
  );
};

export { usePopover };
