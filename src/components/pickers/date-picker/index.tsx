import React, { useState } from "react"
import { Calendar } from "@mijn-ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@mijn-ui/components/popover"
import { formatDate } from "date-fns"
import { LuCalendar } from "react-icons/lu"

type DatePickerProps = {
  date: Date | undefined
  onDatePick: (date: Date | undefined) => void
}

const DatePicker = ({ date, onDatePick }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        unstyled
        className="flex h-9 w-32 items-center justify-between rounded-md border border-main-border bg-surface px-3 py-2 text-xs placeholder:text-neutral-text hover:bg-accent focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:h-10 md:w-40 md:text-sm [&>span]:line-clamp-1"
        type="button"
      >
        {date ? formatDate(date, "d MMM yyyy") : "Select Date"}
        <LuCalendar />
      </PopoverTrigger>
      <PopoverContent align="start" className="border p-1">
        <Calendar mode="single" selected={date} onSelect={onDatePick} />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
