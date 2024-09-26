import React from "react";

import { formatDate } from "date-fns";
import { LuChevronsUpDown } from "react-icons/lu";
import { getTimeInADayArray } from "~/utils/generate";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/mijn-ui/components/DropdownMenu";
import { cn } from "@/mijn-ui/utils";

type TimePickerProps = {
  date: Date | null;
  onTimePick: (date: Date | null) => void;
};

const TimePicker = ({ date, onTimePick }: TimePickerProps) => {
  const TIME_IN_A_DAY = getTimeInADayArray();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-40 items-center justify-between"
        type="button"
      >
        {date ? formatDate(date, "HH:mm") : "Select Time"}
        <LuChevronsUpDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="custom_scroll_bar flex max-h-60 w-40 flex-col gap-0 overflow-y-auto shadow-sm">
        {TIME_IN_A_DAY.map((time, index) => (
          <DropdownMenuItem
            label={time}
            key={index}
            type="button"
            onClick={() => {
              onTimePick(
                date && new Date(`${formatDate(date, "yyyy-MM-dd")} ${time}`),
              );
            }}
            className={cn("text-muted-text", {
              "bg-accent text-main-text hover:brightness-125":
                date && formatDate(date, "HH:mm") === time,
            })}
          >
            {time}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimePicker;
