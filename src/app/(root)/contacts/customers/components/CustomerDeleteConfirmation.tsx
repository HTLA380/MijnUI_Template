import {
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/Dialog";

const CustomerDeleteConfirmation = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <DialogContent className="p-5 sm:p-6">
      <DialogTitle className="text-base sm:text-lg">Are you sure?</DialogTitle>
      <DialogDescription className="mt-2 text-xs sm:text-sm">
        This action is irreversible. It will permanently delete the selected
        customers from your data table.
      </DialogDescription>

      <DialogFooter>
        <DialogClose className="text-xs sm:text-[0.8rem]">Cancel</DialogClose>
        <DialogAction
          onClick={onDelete}
          variant={"danger"}
          className="text-xs sm:text-[0.8rem]"
        >
          Delete
        </DialogAction>
      </DialogFooter>
    </DialogContent>
  );
};

export default CustomerDeleteConfirmation;
