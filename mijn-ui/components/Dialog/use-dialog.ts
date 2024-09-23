import * as React from "react";

import {
  useClick,
  useDismiss,
  useFloating,
  UseFloatingReturn,
  useInteractions,
  UseInteractionsReturn,
  useRole,
} from "@floating-ui/react";

import { DialogOptions } from "./types";

// Explicitly defining the return type of this hook is necessary to avoid TypeScript's issue with inferred types,
// as described in: "https://github.com/microsoft/TypeScript/issues/29808"
// additionally you can see the explanation here "https://github.com/microsoft/TypeScript/pull/58176#issuecomment-2052698294"

export type useDialogReturnType = UseFloatingReturn &
  UseInteractionsReturn & {
    open: boolean;
    setOpen: (open: boolean) => void;
    labelId?: string;
    descriptionId?: string;
    setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
  };

export function useDialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: DialogOptions = {}): useDialogReturnType {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId],
  );
}
