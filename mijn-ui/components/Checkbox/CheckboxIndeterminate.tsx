import * as React from "react";

import { LuCheck, LuMinus } from "react-icons/lu";

import { cn } from "@/utils";

import { CheckboxProps, checkboxStyles } from "./";

const CHECKBOX_STATES = {
  Checked: "checked",
  Indeterminate: "indeterminate",
  Empty: "empty",
} as const;

type CheckboxStates = (typeof CHECKBOX_STATES)[keyof typeof CHECKBOX_STATES];

type CheckboxIndeterminateProps = CheckboxProps & {
  checkboxState?: (typeof CHECKBOX_STATES)[keyof typeof CHECKBOX_STATES];
};

const CheckboxIndeterminate = React.forwardRef<
  HTMLInputElement,
  CheckboxIndeterminateProps
>(
  (
    { variant, id, checkboxState, className, onChange, onClick, ...props },
    ref,
  ) => {
    const inputId = id || React.useId();
    const initialState = checkboxState || CHECKBOX_STATES.Empty;

    const [checked, setChecked] = React.useState<CheckboxStates>(initialState);
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked((prevState) => {
        switch (prevState) {
          case CHECKBOX_STATES.Checked:
            return CHECKBOX_STATES.Empty;
          case CHECKBOX_STATES.Empty:
            return CHECKBOX_STATES.Indeterminate;
          case CHECKBOX_STATES.Indeterminate:
            return CHECKBOX_STATES.Checked;
          default:
            return CHECKBOX_STATES.Empty;
        }
      });
      if (onChange) {
        onChange(event);
      }
    };

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.checked = checked === CHECKBOX_STATES.Checked;
        checkboxRef.current.indeterminate =
          checked === CHECKBOX_STATES.Indeterminate;
      }
    }, [checked]);

    React.useImperativeHandle(
      ref,
      () => checkboxRef.current as HTMLInputElement,
    );

    return (
      <div className="inline-flex items-center gap-2">
        <label htmlFor={inputId} className="relative flex items-center">
          <input
            onChange={handleChange}
            ref={checkboxRef}
            type="checkbox"
            id={inputId}
            className={cn(checkboxStyles({ variant, className }))}
            onClick={onClick}
            {...props}
          />
          <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity peer-checked:opacity-100 peer-indeterminate:opacity-100 peer-disabled:[&>svg]:text-disabled-text">
            {checked === CHECKBOX_STATES.Checked && (
              <LuCheck className="h-4 w-4" />
            )}
            {checked === CHECKBOX_STATES.Indeterminate && (
              <LuMinus className="h-4 w-4" />
            )}
          </span>
        </label>
      </div>
    );
  },
);

CheckboxIndeterminate.displayName = "CheckboxIndeterminate";

export { CheckboxIndeterminate };
