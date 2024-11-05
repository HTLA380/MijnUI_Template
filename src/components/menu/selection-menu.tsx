import React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mijn-ui/components/select"
import { cn } from "@mijn-ui/utils"
import { LuChevronsUpDown } from "react-icons/lu"

type SelectionMenuProps = {
  defaultValue: string | number
  onValueChange?: (value: string | number) => void
  selectionItems: string[] | number[]
  classNames?: {
    selectTrigger?: string
    selectContent?: string
    selectGroup?: string
    selectItem?: string
    selectValue?: string
  }
}

const SelectionMenu = ({
  defaultValue,
  onValueChange,
  selectionItems,
  classNames,
}: SelectionMenuProps) => {
  return (
    <Select
      defaultValue={defaultValue.toString()}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        className={cn(
          "h-9 text-xs md:h-10 md:text-sm",
          classNames?.selectTrigger,
        )}
        icon={<LuChevronsUpDown />}
      >
        <SelectValue className={classNames?.selectValue} />
      </SelectTrigger>
      <SelectContent className={classNames?.selectContent}>
        <SelectGroup className={classNames?.selectGroup}>
          {selectionItems.map((status) => (
            <SelectItem
              key={status}
              value={status.toString()}
              className={cn("text-xs md:text-sm", classNames?.selectItem)}
            >
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectionMenu
