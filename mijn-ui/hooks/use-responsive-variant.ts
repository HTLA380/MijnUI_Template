import { useMemo } from "react";

import { useMediaQuery } from "./use-media-query";

const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

type Breakpoints = keyof typeof screens;

type ResponsiveValue<T> = T extends boolean
  ? boolean
  : T extends string
    ? T
    : keyof T;

type ResponsiveProps<T> = {
  [K in Breakpoints]?: ResponsiveValue<T>;
} & { initial: ResponsiveValue<T> };

function getScreenValue(key: string) {
  return Number.parseInt(screens[key as Breakpoints]);
}

/**
 * Custom hook for handling responsive behavior based on breakpoints.
 * @param props - The responsive props containing breakpoints and initial value.
 * @returns The responsive value based on the current breakpoint.
 */
export function useResponsiveVariant<T>(props: ResponsiveProps<T>) {
  const { initial, ...breakpoints } = props;

  const [matchedBreakpoint] = Object.keys(breakpoints)
    .sort((a, b) => getScreenValue(b) - getScreenValue(a))
    .map((breakpoint) =>
      useMediaQuery(`(min-width: ${screens[breakpoint as Breakpoints]})`)
        ? breakpoints[breakpoint as Breakpoints]
        : undefined,
    )
    .filter((value) => value !== undefined);

  const size = useMemo(() => {
    return matchedBreakpoint ?? initial;
  }, [initial, matchedBreakpoint]);

  return size as ResponsiveValue<T>;
}
