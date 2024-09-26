import { Placement } from "@floating-ui/react";

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
}
