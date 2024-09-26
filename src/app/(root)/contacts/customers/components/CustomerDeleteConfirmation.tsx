import { LuInfo } from "react-icons/lu";
import Spinner from "~/components/loader/Spinner";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/Dialog";
import { Button } from "@/mijn-ui/components/Button";

/* -------------------------------------------------------------------------- */

type CustomerDeleteConfirmationProps = {
  onDelete: () => void;
  isLoading: boolean;
};

const CustomerDeleteConfirmation = ({
  onDelete,
  isLoading,
}: CustomerDeleteConfirmationProps) => {
  return (
    <DialogContent className="relative p-5 sm:p-6">
      <DialogTitle className="text-base sm:text-lg">Are you sure?</DialogTitle>
      <DialogDescription className="mt-2 text-xs sm:text-sm">
        This action is irreversible. It will permanently delete the selected
        customers from your data table.
      </DialogDescription>

      <DialogFooter>
        <DialogClose className="text-xs sm:text-default">Cancel</DialogClose>
        <Button
          onClick={onDelete}
          variant={"danger"}
          disabled={isLoading}
          className={"gap-2 text-xs sm:text-default"}
        >
          Delete
          {isLoading && <Spinner className="h-4 w-4" />}
        </Button>
      </DialogFooter>

      <Button
        variant={"ghost"}
        size={"icon"}
        className="peer absolute right-1 top-1 hover:bg-transparent hover:text-muted-text"
      >
        <LuInfo size={16} />
      </Button>

      <p className="pointer-events-none absolute right-10 top-0 max-w-60 -translate-y-1/2 rounded-md bg-main p-2 text-xs text-main-text opacity-0 shadow-lg transition duration-300 ease-out peer-focus:pointer-events-auto peer-focus:opacity-100">
        This delete action will simulate a delete request and will not actually
        remove customers.
      </p>
    </DialogContent>
  );
};

export default CustomerDeleteConfirmation;
