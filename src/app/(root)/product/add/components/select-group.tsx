import { DialogTrigger } from "@mijn-ui/components/dialog"
import { Input } from "@mijn-ui/components/input"
import { Label } from "@mijn-ui/components/label"
import {
  SelectGroup as MijnUISelectGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@mijn-ui/components/select"
import { FaPlus } from "react-icons/fa6"

export type SelectField = {
  label: string
  placeholder: string
  name: string
  id: string
  addable?: boolean
  handleModalOpen?: () => void
  selectItems: {
    label: string
    value: string
  }[]
}

const SelectGroup = (props: SelectField) => {
  return (
    <div className="flex min-w-48 flex-1 flex-col justify-center gap-2">
      <Label className="text-xs md:text-sm">{props.label}</Label>
      <div className="flex gap-0.5">
        <Select required name={props.name}>
          <SelectTrigger className="lg:w-[180px] w-full h-9 md:h-10 text-xs md:text-sm">
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <MijnUISelectGroup>
              <Input
                type="text"
                placeholder="Search"
                className="p-2"
                autoFocus
                classNames={{ input: "text-xs md:text-sm" }}
              />
              <SelectLabel>{props.label}</SelectLabel>
              {props.selectItems.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="text-xs md:text-sm"
                >
                  {item.label}
                </SelectItem>
              ))}
            </MijnUISelectGroup>
          </SelectContent>
        </Select>
        {props.addable && (
          <DialogTrigger
            className="bg-neutral h-9 md:h-10"
            onClick={props.handleModalOpen}
          >
            <FaPlus />
          </DialogTrigger>
        )}
      </div>
    </div>
  )
}

export default SelectGroup
