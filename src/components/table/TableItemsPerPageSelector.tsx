import {
  Select,
  SelectContent,
  SelectOption,
  SelectTrigger,
} from "@/mijn-ui/components/Select";

type TableItemsPagePageSelector = {
  onSelect: (index: number) => void;
  options: Array<number>;
  defaultSelectedLabel: string;
  defaultSelectedIndex: number;
};

const TableItemsPerPageSelector = ({
  onSelect,
  options,
  defaultSelectedLabel: defaultLabel,
  defaultSelectedIndex: defaultIndex,
}: TableItemsPagePageSelector) => {
  return (
    <Select
      onSelect={onSelect}
      defaultSelectedLabel={defaultLabel}
      defaultSelectedIndex={defaultIndex}
    >
      <SelectTrigger className="h-8 w-16 justify-start text-xs md:h-9 md:w-20 md:text-sm">
        {({ selectedLabel }) => <div>{selectedLabel}</div>}
      </SelectTrigger>
      <SelectContent className="w-20">
        {options.map((item, index) => (
          <SelectOption
            className="py-2 text-xs md:text-sm"
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

export default TableItemsPerPageSelector;
