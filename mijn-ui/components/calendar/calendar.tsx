"use client"

import * as React from "react"
import { buttonStyles } from "@mijn-ui/components/button"
import { cn } from "@mijn-ui/utils"
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker"
import {
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuChevronUp,
} from "react-icons/lu"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("border-main-border bg-surface p-3", className)}
      classNames={{
        [UI.Months]: "relative flex flex-col sm:flex-row",
        [UI.Month]: "",
        [UI.MonthCaption]: "flex justify-center py-1.5 relative items-center",
        [UI.CaptionLabel]: "text-sm font-medium",
        [UI.PreviousMonthButton]: cn(
          buttonStyles({ variant: "outline", color: "neutral" }),
          "absolute left-1 top-0 md:size-7 size-6  bg-transparent p-0 z-10 opacity-50 hover:opacity-100",
        ),
        [UI.NextMonthButton]: cn(
          buttonStyles({ variant: "outline", color: "neutral" }),
          "absolute right-1 top-0 md:size-7 size-6  bg-transparent p-0 z-10 opacity-50 hover:opacity-100",
        ),
        [UI.MonthGrid]: "w-full border-collapse space-y-1",
        [UI.Weekdays]: "flex",
        [UI.Weekday]:
          "text-neutral-text md:size-9 size-8  font-normal text-[0.8rem] flex items-center justify-center",
        [UI.Week]: "flex w-full mt-0.5",
        [UI.Day]: cn(
          buttonStyles({ variant: "text", color: "accent" }),
          "md:size-9 size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        [UI.DayButton]:
          "md:size-9 size-8 text-center text-xs md:text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        [SelectionState.range_end]: "day-range-end",
        [SelectionState.selected]:
          "bg-primary text-primary-text hover:bg-primary hover:text-primary-text focus:bg-primary focus:text-primary-text",
        [SelectionState.range_middle]:
          "aria-selected:bg-accent aria-selected:text-accent-text",
        [DayFlag.today]: "bg-accent text-accent-text",
        [DayFlag.outside]:
          "day-outside text-neutral-text opacity-50 aria-selected:bg-accent/50 aria-selected:text-neutral-text aria-selected:opacity-30",
        [DayFlag.disabled]: "text-neutral-text opacity-50",
        [DayFlag.hidden]: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => <Chevron {...props} />,
      }}
      {...props}
    />
  )
}

const Chevron = ({ orientation = "left" }) => {
  switch (orientation) {
    case "left":
      return <LuChevronLeft className="h-4 w-4" />
    case "right":
      return <LuChevronRight className="h-4 w-4" />
    case "up":
      return <LuChevronUp className="h-4 w-4" />
    case "down":
      return <LuChevronDown className="h-4 w-4" />
    default:
      return null
  }
}
