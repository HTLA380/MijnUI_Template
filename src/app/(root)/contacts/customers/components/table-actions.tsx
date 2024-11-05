import React from "react"
import Link from "next/link"
import { AlertDialogTrigger } from "@mijn-ui/components/alert-dialog"
import { buttonStyles } from "@mijn-ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@mijn-ui/components/dropdown-menu"
import { Input } from "@mijn-ui/components/input"
import { cn } from "@mijn-ui/utils"
import { FaTrash } from "react-icons/fa"
import { LuPlus, LuSearch } from "react-icons/lu"
import { PiExport } from "react-icons/pi"

/* -------------------------------------------------------------------------- */

type TableActionsProps = {
  searchInput: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  totalSelectedUsers: number
}

const TableActions = ({
  searchInput,
  handleInputChange,
  totalSelectedUsers,
}: TableActionsProps) => {
  const renderSearchInput = (
    <Input
      value={searchInput}
      onChange={handleInputChange}
      className="mt-2 md:mx-2 md:mt-4"
      classNames={{
        input: "text-xs font-normal md:text-sm md:h-10 h-9 pl-7 md:pl-8",
        startIcon: "[&>svg]:size-3 md:[&>svg]:size-3.5",
      }}
      placeholder="Search by name..."
      startIcon={<LuSearch />}
    />
  )

  const renderDeleteDialog = (
    <AlertDialogTrigger
      unstyled
      className={cn(buttonStyles({ color: "accent" }))}
    >
      Delete ({totalSelectedUsers})
      <FaTrash />
    </AlertDialogTrigger>
  )

  const renderExportReport = (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center gap-1 rounded-full border border-main-border bg-surface p-0 text-xs placeholder:text-neutral-text hover:bg-accent focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:h-10 md:w-40 md:justify-between md:rounded-md md:px-3 md:text-sm [&>span]:line-clamp-1">
        <div className="hidden md:inline-block">Export Report</div>
        <PiExport size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenuItem className="text-xs md:text-sm">
          Copy to clipboard
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs md:text-sm">
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs md:text-sm">
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs md:text-sm">
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className="flex w-full flex-col flex-wrap items-start justify-center gap-2 rounded-t-2xl bg-surface p-5 pb-2 sm:flex-row sm:items-center sm:justify-between md:flex-nowrap md:p-5 lg:gap-x-4">
      <div className="max-w-fit md:w-3/4">
        <h3 className="text-sm font-semibold md:text-base">All Customers</h3>

        {renderSearchInput}
      </div>

      <div className="mx-2 flex min-w-fit shrink-0 flex-wrap items-center justify-end gap-2 md:w-1/4">
        {totalSelectedUsers > 0 && renderDeleteDialog}
        {renderExportReport}

        <Link
          href={"/contacts/customers/create"}
          className={cn(
            buttonStyles(),
            "size-8 rounded-full p-0 md:size-10 md:w-auto md:gap-2 md:rounded-md md:px-3 md:text-sm",
          )}
        >
          <span className="hidden md:inline-block">Add</span>
          <LuPlus size={16} />
        </Link>
      </div>
    </div>
  )
}

export default TableActions
