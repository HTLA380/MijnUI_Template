import * as React from "react";

const ToggleContext = React.createContext<{
  isOpen: boolean;
  toggle: (isOpen?: boolean) => void;
} | null>(null);

export const useToggleContext = () => {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggleContext must be used within a ToggleProvider");
  }
  return context;
};

export const ToggleProvider = ({
  children,
  isOpen: controlledIsOpen,
  onToggle,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}) => {
  // Internal state management
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = React.useState(false);

  // Determine if state is controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const currentIsOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Handle toggle logic
  const toggle = (newState?: boolean) => {
    const nextState = newState !== undefined ? newState : !currentIsOpen;
    if (isControlled && onToggle) {
      onToggle(nextState);
    } else {
      setUncontrolledIsOpen(nextState);
    }
  };

  return (
    <ToggleContext.Provider value={{ isOpen: currentIsOpen, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
