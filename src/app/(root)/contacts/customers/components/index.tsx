"use client";

import * as React from "react";

import DeleteModalContent from "./delete-modal-content";
import TablePaginator from "@/components/table/table-paginator";

import { Table } from "@mijn-ui/components/table";

import { useCustomerTable } from "../hooks/use-customer-table";
import TableActions from "./table-actions";
import TableBody from "./table-body";
import TableErrorMessage from "./table-error-message";
import TableHeader from "./table-header";
import { AlertDialog } from "@mijn-ui/components/alert-dialog";
import SelectionMenu from "@/components/menu/selection-menu";

/* -------------------------------------------------------------------------- */

const ItemsPerPageArray = ["10", "20", "30"];

const CustomerTable: React.FC = () => {
  const {
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    searchInput,
    selectedUsersId,
    isAllUserSelected,
    users,
    isLoading,
    isError,
    handleCheck,
    handleSelectAll,
    handleSort,
    handleInputChange,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDelete,
    isDeleteLoading,
  } = useCustomerTable();

  return (
    <>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <TableActions
          searchInput={searchInput}
          handleInputChange={handleInputChange}
          totalSelectedUsers={selectedUsersId.length}
        />

        <div className="custom_scroll_bar relative h-full max-h-max min-h-60 w-full overflow-auto bg-surface">
          <TableErrorMessage isError={isError} />

          <Table className="w-full border-none">
            <TableHeader
              handleSelectAll={handleSelectAll}
              handleSort={handleSort}
              isAllUserSelected={isAllUserSelected}
            />

            <TableBody
              users={users?.users}
              isLoading={isLoading}
              handleCheck={handleCheck}
              selectedUsersId={selectedUsersId}
            />

            <DeleteModalContent
              isLoading={isDeleteLoading}
              onDelete={handleDelete}
            />
          </Table>
        </div>
      </AlertDialog>

      <div className="flex w-full flex-wrap items-center justify-between gap-2 bg-surface p-5 md:flex-nowrap md:rounded-b-2xl">
        <div className="flex w-full items-center gap-4">
          <div className="flex w-full items-center justify-between gap-4 md:justify-normal">
            <div className="w-20">
              <SelectionMenu
                defaultValue={itemsPerPage}
                selectionItems={ItemsPerPageArray}
                onValueChange={(value) => setItemsPerPage(Number(value))}
                classNames={{
                  selectContent: "min-w-20",
                }}
              />
            </div>

            {/* Selected Users */}
            <p className="text-xs text-neutral-text md:text-sm">
              Users {selectedUsersId.length} selected out of {users?.total}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:justify-end">
          <TablePaginator
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onChangePage={setCurrentPage}
            total={users?.total}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerTable;

/* -------------------------------------------------------------------------- */
