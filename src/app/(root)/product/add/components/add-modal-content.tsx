import { FormEvent } from "react"
import { Button } from "@mijn-ui/components/button"
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@mijn-ui/components/dialog/dialog"
import InputGroup, {
  InputField,
} from "@/app/(root)/product/add/components/input-group"
import { LuX } from "react-icons/lu"

export type AddModalContentProps = {
  title: string
  inputFields: InputField[]
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const AddModalContent = (props: AddModalContentProps) => {
  return (
    <DialogContent className="relative">
      <DialogClose className="absolute right-4 top-4 border-none p-2 text-lg text-neutral-text hover:text-main-text">
        <LuX />
      </DialogClose>
      <div>
        <DialogTitle>{props.title}</DialogTitle>
      </div>
      <form onSubmit={props.handleSubmit}>
        <div className="mt-4 space-y-2">
          {props.inputFields.map((item) => (
            <InputGroup key={item.id} {...item} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <DialogClose>Close</DialogClose>
          <DialogClose asChild unstyled>
            <Button type="submit">Submit</Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  )
}

export default AddModalContent
