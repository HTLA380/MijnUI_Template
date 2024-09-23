import { FaTrash } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";

import { Button } from "@/mijn-ui/components/Button";
import { Dialog, DialogTrigger } from "@/mijn-ui/components/Dialog";
import { Input } from "@/mijn-ui/components/Input";

import CustomerDeleteConfirmation from "./CustomerDeleteConfirmation";

const CustomerTableActions = ({
  inputValue,
  handleInputChange,
  selectedUsersId,
  handleDelete,
}: {
  inputValue: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedUsersId: number[];
  handleDelete: () => void;
}) => (
  <div className="flex w-full items-center justify-between rounded-t-2xl bg-surface p-5">
    <div>
      <h3 className="text-base font-semibold">All Customers</h3>

      <Input
        value={inputValue}
        onChange={handleInputChange}
        className="mx-2 mt-4 max-w-80 gap-2 font-normal"
        placeholder="Search by name..."
        startIcon={<LuSearch />}
      />
    </div>

    <div className="flex w-full items-center justify-end gap-2">
      {selectedUsersId.length > 0 && (
        <Dialog>
          <DialogTrigger className="h-[2.15rem] gap-2 text-[0.8rem]">
            Delete ({selectedUsersId.length})
            <FaTrash />
          </DialogTrigger>

          <CustomerDeleteConfirmation onDelete={handleDelete} />
        </Dialog>
      )}
      <Button variant={"secondary"} className="h-[2.15rem] text-[0.8rem]">
        Export Report
      </Button>
      <Button className="h-[2.15rem] text-[0.8rem]">Add</Button>
    </div>
  </div>
);

export default CustomerTableActions;
