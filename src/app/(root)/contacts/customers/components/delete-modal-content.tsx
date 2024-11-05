import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@mijn-ui/components/alert-dialog"
import { Button } from "@mijn-ui/components/button"
import Spinner from "@/components/loader/spinner"
import { LuInfo } from "react-icons/lu"

/* -------------------------------------------------------------------------- */

type DeleteModalContentProps = {
  onDelete: () => void
  isLoading: boolean
}

const DeleteModalContent = ({
  onDelete,
  isLoading,
}: DeleteModalContentProps) => {
  return (
    <AlertDialogContent className="relative p-5 sm:p-6">
      <AlertDialogTitle className="text-base sm:text-lg">
        Are you sure?
      </AlertDialogTitle>
      <AlertDialogDescription className="text-xs sm:text-sm">
        This action is irreversible. It will permanently delete the selected
        customers from your data table.
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel className="text-xs sm:text-sm">
          Cancel
        </AlertDialogCancel>
        <Button
          onClick={onDelete}
          color="danger"
          disabled={isLoading}
          className={"sm:text-default gap-2 text-xs"}
        >
          Delete
          {isLoading && <Spinner className="h-4 w-4" />}
        </Button>
      </AlertDialogFooter>

      <Button
        color="accent"
        variant="text"
        size={"icon"}
        className="peer absolute right-1 top-1 hover:bg-transparent hover:text-neutral-text"
      >
        <LuInfo size={16} />
      </Button>

      <p className="pointer-events-none absolute right-10 top-0 max-w-60 -translate-y-1/2 rounded-md bg-main p-2 text-xs text-main-text opacity-0 shadow-lg transition duration-300 ease-out peer-focus:pointer-events-auto peer-focus:opacity-100">
        This delete action will simulate a delete request and will not actually
        remove customers.
      </p>
    </AlertDialogContent>
  )
}

export default DeleteModalContent
