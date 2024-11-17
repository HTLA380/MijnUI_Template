import React from "react"
import { Checkbox } from "@mijn-ui/components/checkbox"
import {
  TableHeader as MijnUITableHeader,
  TableHeaderCell,
  TableRow,
} from "@mijn-ui/components/table"
import { cn } from "@mijn-ui/utils"
import { LuChevronsUpDown } from "react-icons/lu"

/* -------------------------------------------------------------------------- */

type TableHeaderProps = {
  isAllUserSelected: boolean
  handleSelectAll: () => void
  handleSort: () => void
}

const TableHeader = ({
  isAllUserSelected,
  handleSelectAll,
  handleSort,
}: TableHeaderProps) => {
  return (
    <MijnUITableHeader className="sticky left-0 top-0 z-10 bg-surface">
      <TableRow className="border-none">
        <TableHeaderCell>
          <Checkbox
            className="size-[1.125rem] border-main-border md:size-5 [&+span>svg]:size-[0.7rem] md:[&+span>svg]:size-4"
            checked={isAllUserSelected}
            onCheckedChange={handleSelectAll}
          />
        </TableHeaderCell>

        {ProductTableHeaderItems.map((cell) => (
          <TableHeaderCell
            key={cell.name}
            onClick={cell.sortable ? handleSort : undefined}
            className={cn(
              "px-3 py-2 text-xs md:px-4 md:py-3 md:text-sm",
              cell.className,
              !cell.displayOnMobile && "hidden sm:table-cell",
            )}
          >
            <p className={cn("flex items-center gap-2", cell.justify ?? "")}>
              {cell.name}

              {cell.sortable && <LuChevronsUpDown />}
            </p>
          </TableHeaderCell>
        ))}
      </TableRow>
    </MijnUITableHeader>
  )
}

/* -------------------------------------------------------------------------- */

type TableHeaderItem = {
  name: string
  className?: string
  sortable?: boolean
  displayOnMobile: boolean
  justify?: string
}

const ProductTableHeaderItems: TableHeaderItem[] = [
  {
    name: "Product",
    className: "w-full min-w-72 cursor-pointer",
    sortable: true,
    displayOnMobile: true,
  },
  {
    name: "Category",
    className: "w-full min-w-16",
    displayOnMobile: true,
  },
  {
    name: "Selling Price ($)",
    className: "min-w-16",
    displayOnMobile: true,
    justify: "justify-end",
  },
  {
    name: "Stock",
    className: "w-full min-w-44",
    displayOnMobile: true,
    justify: "justify-end",
  },
  {
    name: "Brand",
    className: "w-full min-w-60",
    displayOnMobile: false,
  },
  {
    name: "SKU",
    className: "min-w-44",
    displayOnMobile: false,
  },
  {
    name: "Availability Status",
    className: "min-w-44",
    displayOnMobile: true,
  },
  {
    name: "Created At",
    className: "",
    displayOnMobile: true,
  },
  {
    name: "Updated At",
    className: "",
    displayOnMobile: true,
  },
  {
    name: "",
    className: "",
    displayOnMobile: true,
  },
]

export default TableHeader
