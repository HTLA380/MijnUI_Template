import React from "react";

import { formatDate } from "date-fns";
import { LuChevronsUpDown } from "react-icons/lu";
import { getTimeInADayArray } from "@/utils/generate";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mijn-ui/components/select";

type TimePickerProps = {
  date: Date | undefined;
  onTimePick: (date: Date | undefined) => void;
};

const TimePicker = ({ date, onTimePick }: TimePickerProps) => {
  const TIME_IN_A_DAY = getTimeInADayArray();

  return (
    <Select defaultValue={TIME_IN_A_DAY[0]}>
      <SelectTrigger
        className="h-9 w-32 text-xs md:h-10 md:text-sm"
        icon={<LuChevronsUpDown />}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="flex max-h-60 w-32">
        {TIME_IN_A_DAY.map((time, index) => (
          <SelectItem
            value={time}
            key={index}
            className="text-xs md:text-sm"
            onClick={() =>
              onTimePick(
                date && new Date(`${formatDate(date, "yyyy-MM-dd")} ${time}`),
              )
            }
          >
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimePicker;
