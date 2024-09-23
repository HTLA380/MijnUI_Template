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
      <SelectTrigger className="w-20 justify-start">
        {({ selectedLabel }) => <div>{selectedLabel}</div>}
      </SelectTrigger>
      <SelectContent className="w-20">
        {options.map((item, index) => (
          <SelectOption key={index} value={item.toString()}>
            {item}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TableItemsPerPageSelector;
