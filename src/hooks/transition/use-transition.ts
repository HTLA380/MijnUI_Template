/* eslint-disable */

import * as React from "react";

import { Canceller, clearAnimationFrameTimeout, setAnimationFrameTimeout } from "./setAnimationFrameTimeout";

export type Stage = "initial" | "open" | "close";

// Debounce function to limit the rate of state changes
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
}

export function useTransition(state: boolean, timeout: number, animateOnMount: boolean) {
  const [transitionStatus, setTransitionStatus] = React.useState<Stage>(state ? "open" : "initial");

  const timer = React.useRef<Canceller>({});
  const [isMounted, setIsMounted] = React.useState(state);

  const handleStateChange = React.useCallback(
    debounce((newState: boolean) => {
      clearAnimationFrameTimeout(timer.current);

      if (newState) {
        setTransitionStatus("initial");
        setIsMounted(true);
        if (animateOnMount) {
          timer.current = setAnimationFrameTimeout(() => {
            setTransitionStatus("open");
          });
        } else {
          setTransitionStatus("open");
        }
      } else {
        setTransitionStatus("close");
        timer.current = setAnimationFrameTimeout(() => {
          setIsMounted(false);
        }, timeout);
      }
    }, 50), // Adjust the debounce delay as needed
    [timeout, animateOnMount]
  );

  React.useEffect(() => {
    handleStateChange(state);

    return () => {
      clearAnimationFrameTimeout(timer.current);
    };
  }, [state, handleStateChange]);

  return {
    transitionStatus,
    isMounted,
  };
}
