import React from "react";

import { formatDate } from "date-fns";
import { LuCalendar } from "react-icons/lu";

import { Calendar } from "@/mijn-ui/components/Calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  useDropdownMenuContext,
} from "@/mijn-ui/components/DropdownMenu";

type DatePickerProps = {
  date: Date | null;
  onDatePick: (date: Date) => void;
};

const DatePicker = ({ date, onDatePick }: DatePickerProps) => {
  // have to use a separate component in order to access the setIsOpen from the dropdown menu context
  const CalendarComponent = () => {
    const { setIsOpen } = useDropdownMenuContext();

    return (
      <Calendar
        className="p-3 [&_.calendar-button]:size-8 [&_.calendar-button]:text-default"
        selectedDate={date}
        onChange={(date) => {
          onDatePick(date);
          setIsOpen(false);
        }}
      />
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-40 items-center justify-between"
        type="button"
      >
        {date ? formatDate(date, "d MMM yyyy") : "Select Date"}
        <LuCalendar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none p-0 shadow-sm">
        <CalendarComponent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DatePicker;
