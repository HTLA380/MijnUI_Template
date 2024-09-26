import { LuChevronsUpDown } from "react-icons/lu";

import {
  Select,
  SelectContent,
  SelectOption,
  SelectTrigger,
} from "@/mijn-ui/components/Select";
import { cn } from "@/mijn-ui/utils";

type SelectionMenuProps = {
  defaultSelectedIndex: number;
  defaultSelectedLabel: string;
  selectionTitle: string;
  selectionItems: string[] | number[];
};

const SelectionMenu = ({
  defaultSelectedIndex,
  defaultSelectedLabel,
  selectionTitle,
  selectionItems,
}: SelectionMenuProps) => {
  return (
    <Select
      defaultSelectedIndex={defaultSelectedIndex}
      defaultSelectedLabel={defaultSelectedLabel}
    >
      <SelectTrigger
        type="button"
        className="h-auto w-48 justify-start py-2 text-xs md:text-sm"
      >
        {({ selectedLabel }) => (
          <div
            className={cn(
              "gap- flex w-full items-center justify-between",
              !selectedLabel && "text-muted-text",
            )}
          >
            <span className="w-full truncate text-start">{selectedLabel}</span>
            <LuChevronsUpDown className="flex-shrink-0" />
          </div>
        )}
      </SelectTrigger>
      <SelectContent className="w-48 shadow-sm">
        <div className="px-3 py-2 text-default">
          <p className="font-semibold text-muted-text brightness-75">
            {selectionTitle}
          </p>
        </div>
        {selectionItems.map((item, index) => (
          <SelectOption
            type="button"
            className="py-2 text-xs text-muted-text data-[active]:text-main-text data-[selected]:text-main-text md:text-default"
            key={index}
            value={item.toString()}
          >
            {item}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectionMenu;
