import * as React from "react";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { Button } from "@/components/Button";
import { cn } from "@/utils";

type CalendarProps = {
  selectedDate?: Date | null;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  dateFormat?: "d" | "dd";
  className?: string;
};

const Calendar = ({
  selectedDate,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  dateFormat = "d",
  className,
}: CalendarProps) => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = React.useState<Date>(
    selectedDate || today,
  );
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy"),
  );

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const months = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const days = React.useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });
  }, [firstDayCurrentMonth]);

  React.useEffect(() => {
    if (selectedDate) setSelectedDay(selectedDate);
  }, [selectedDate]);

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function handleDateSelect(day: Date) {
    if (
      (minDate && isBefore(day, minDate)) ||
      (maxDate && isAfter(day, maxDate)) ||
      disabledDates.some((disabledDate) => isEqual(day, disabledDate))
    ) {
      return;
    }
    setSelectedDay(day);
    if (onChange) {
      onChange(day);
    }
  }

  return (
    <div
      className={cn(
        "mx-auto w-full rounded-lg border border-main-border p-4",
        className,
      )}
    >
      <div className="flex items-center">
        <Button
          size={"icon"}
          onClick={previousMonth}
          variant={"outline"}
          className="h-7 w-7 rounded-default text-disabled-text"
        >
          <span className="sr-only">Previous month</span>
          <LuChevronLeft className="h-5 w-5" aria-hidden="true" />
        </Button>

        <h3 className="flex-1 text-center text-sm font-semibold text-main-text">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h3>

        <Button
          size={"icon"}
          onClick={nextMonth}
          variant={"outline"}
          className="h-7 w-7 rounded-default text-disabled-text"
        >
          <span className="sr-only">Next month</span>
          <LuChevronRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs leading-6 text-disabled-text">
        {months.map((month) => (
          <div key={month} className="flex h-9 w-9 items-center justify-center">
            {month.slice(0, 2)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => (
          <Button
            key={dayIdx}
            type="button"
            size={"icon"}
            variant={"ghost"}
            onClick={() => handleDateSelect(day)}
            className={getDateButtonClassNames(
              day,
              selectedDay,
              firstDayCurrentMonth,
              disabledDates,
              minDate,
              maxDate,
            )}
            disabled={
              (minDate && isBefore(day, minDate)) ||
              (maxDate && isAfter(day, maxDate)) ||
              disabledDates.some((disabledDate) => isEqual(day, disabledDate))
            }
            aria-selected={isEqual(day, selectedDay)}
          >
            <time dateTime={format(day, "yyyy-MM-dd")}>
              {format(day, dateFormat)}
            </time>
          </Button>
        ))}
      </div>
    </div>
  );
};

export { Calendar };

const getDateButtonClassNames = (
  day: Date,
  selectedDay: Date,
  firstDayCurrentMonth: Date,
  disabledDates: Date[],
  minDate?: Date,
  maxDate?: Date,
) => {
  const baseClasses =
    "calendar-button mx-auto flex h-9 w-9 items-center justify-center";

  const isSelected = isEqual(day, selectedDay);
  const isCurrentDay = isToday(day);
  const isWithinSameMonth = isSameMonth(day, firstDayCurrentMonth);
  const isDisabled =
    (minDate && isBefore(day, minDate)) ||
    (maxDate && isAfter(day, maxDate)) ||
    disabledDates.some((disabledDate) => isEqual(day, disabledDate));

  return cn(
    baseClasses,

    isSelected &&
      isWithinSameMonth &&
      "text-white bg-primary hover:bg-primary hover:text-white",

    isSelected &&
      !isCurrentDay &&
      !isWithinSameMonth &&
      "bg-accent text-disabled-text hover:text-disabled-text",

    !isSelected && "hover:bg-accent",

    !isSelected && isCurrentDay && "text-primary hover:text-primary",

    !isSelected && !isCurrentDay && isWithinSameMonth && "text-main-text",

    !isSelected &&
      !isCurrentDay &&
      !isWithinSameMonth &&
      "text-disabled hover:bg-accent hover:text-disabled-text",

    isDisabled && "cursor-not-allowed !text-disabled !bg-transparent",
  );
};
