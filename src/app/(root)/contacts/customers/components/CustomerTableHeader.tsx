import React from "react";

import { LuChevronsUpDown } from "react-icons/lu";

import { Checkbox } from "@/mijn-ui/components/Checkbox";
import {
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/mijn-ui/components/Table";
import { cn } from "@/mijn-ui/utils";

/* -------------------------------------------------------------------------- */

type CustomerTableHeaderProps = {
  isAllUserSelected: boolean;
  handleSelectAll: () => void;
  handleSort: () => void;
};

const CustomerTableHeader = ({
  isAllUserSelected,
  handleSelectAll,
  handleSort,
}: CustomerTableHeaderProps) => {
  return (
    <TableHeader className="sticky left-0 top-0 z-10 bg-surface">
      <TableRow className="border-none">
        <TableHeaderCell>
          <Checkbox
            className="size-[1.125rem] border-muted-text md:size-5 [&+span>svg]:size-[0.7rem] md:[&+span>svg]:size-4"
            checked={isAllUserSelected}
            onChange={handleSelectAll}
          />
        </TableHeaderCell>

        {CustomerTableHeaderItems.map((cell) => (
          <TableHeaderCell
            key={cell.name}
            onClick={cell.sortable ? handleSort : undefined}
            className={cn(
              "px-3 py-2 text-xs md:px-4 md:py-3 md:text-sm",
              cell.className,
              !cell.displayOnMobile && "hidden sm:table-cell",
            )}
          >
            <span className="flex items-center gap-2">
              {cell.name}

              {cell.sortable && <LuChevronsUpDown />}
            </span>
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
  );
};

/* -------------------------------------------------------------------------- */

type TableHeaderItem = {
  name: string;
  className?: string;
  sortable?: boolean;
  displayOnMobile: boolean;
};

const CustomerTableHeaderItems: TableHeaderItem[] = [
  {
    name: "Customer",
    className: "w-full min-w-44 cursor-pointer",
    sortable: true,
    displayOnMobile: true,
  },
  {
    name: "Phone",
    className: "w-full min-w-44",
    displayOnMobile: true,
  },
  {
    name: "Contact Type",
    className: "min-w-32",
    displayOnMobile: true,
  },
  {
    name: "Company",
    className: "w-full min-w-44",
    displayOnMobile: true,
  },
  {
    name: "Location",
    className: "w-full min-w-60",
    displayOnMobile: false,
  },
  {
    name: "Contact Id",
    className: "min-w-44",
    displayOnMobile: false,
  },
  {
    name: "Date Added",
    className: "min-w-32",
    displayOnMobile: true,
  },
  {
    name: "Status",
    className: "",
    displayOnMobile: true,
  },
  {
    name: "",
    className: "",
    displayOnMobile: true,
  },
];

export default CustomerTableHeader;
