import React from "react";

import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { LuPlus, LuSearch } from "react-icons/lu";
import { PiExport } from "react-icons/pi";

import { Button } from "@/mijn-ui/components/Button";
import { DialogTrigger } from "@/mijn-ui/components/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/mijn-ui/components/DropdownMenu";
import { Input } from "@/mijn-ui/components/Input";

/* -------------------------------------------------------------------------- */

type CustomerTableActionsProps = {
  searchInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalSelectedUsers: number;
};

const CustomerTableActions = ({
  searchInput,
  handleInputChange,
  totalSelectedUsers,
}: CustomerTableActionsProps) => {
  const renderSearchInput = (
    <Input
      value={searchInput}
      onChange={handleInputChange}
      className="my-2 max-w-80 gap-2 px-2.5 py-2 text-xs font-normal md:mx-2 md:mt-4 md:p-2.5 md:text-sm"
      placeholder="Search by name..."
      startIcon={<LuSearch />}
    />
  );

  const renderDeleteDialog = (
    <DialogTrigger className="h-default gap-2 text-xs md:text-default">
      Delete ({totalSelectedUsers})
      <FaTrash />
    </DialogTrigger>
  );

  const renderExportReport = (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-default w-default rounded-full border-main-text p-0 md:w-auto md:gap-2 md:rounded-md md:px-3 md:text-default">
        <span className="hidden md:inline-block">Export Report</span>
        <PiExport size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="border-muted-text text-xs text-muted-text md:text-default"
          label="copy"
        >
          Copy to clipboard
        </DropdownMenuItem>
        <DropdownMenuItem
          className="border-muted-text text-xs text-muted-text md:text-default"
          label="export excel"
        >
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem
          className="border-muted-text text-xs text-muted-text md:text-default"
          label="export csv"
        >
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          className="border-muted-text text-xs text-muted-text md:text-default"
          label="export pdf"
        >
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex w-full flex-col flex-wrap items-start justify-center gap-2 rounded-t-2xl bg-surface p-5 pb-2 sm:flex-row sm:items-center sm:justify-between md:flex-nowrap md:p-5 lg:gap-x-4">
      <div className="max-w-fit md:w-3/4">
        <h3 className="text-sm font-semibold md:text-base">All Customers</h3>

        {renderSearchInput}
      </div>

      <div className="mx-2 flex min-w-fit shrink-0 flex-wrap items-center justify-end gap-2 md:w-1/4">
        {totalSelectedUsers > 0 && renderDeleteDialog}
        {renderExportReport}

        <Button
          renderAs={Link}
          href={"/contacts/customers/create"}
          className="h-default w-default rounded-full p-0 md:w-auto md:gap-2 md:rounded-md md:px-3 md:text-default"
        >
          <span className="hidden md:inline-block">Add</span>
          <LuPlus size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CustomerTableActions;
