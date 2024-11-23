import { Input } from "@mijn-ui/components/input"
import { Label } from "@mijn-ui/components/label"

export type InputField = {
  label: string
  type: string
  placeholder: string
  id: string
  name: string
}

const InputGroup = (props: InputField) => {
  return (
    <div className="flex min-w-48 flex-1 flex-col justify-center gap-2">
      <Label className="text-xs md:text-sm" htmlFor={props.id}>
        {props.label}
      </Label>
      <Input
        required
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        classNames={{
          input:
            "text-xs md:text-sm placeholder:text-xs md:placeholder:text-sm",
        }}
      />
    </div>
  )
}

export default InputGroup
