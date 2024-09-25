"use client";

import * as React from "react";

import CustomerDeleteConfirmation from "~/app/(root)/contacts/customers/components/CustomerDeleteConfirmation";
import TableItemsPerPageSelector from "~/components/table/TableItemsPerPageSelector";
import TablePaginator from "~/components/table/TablePaginatior";

import { Dialog } from "@/mijn-ui/components/Dialog";
import { Table } from "@/mijn-ui/components/Table";

import { useCustomerTable } from "../hooks/use-customer-table";
import CustomerTableActions from "./CustomerTableActions";
import CustomerTableBody from "./CustomerTableBody";
import CustomerTableError from "./CustomerTableError";
import CustomerTableHeader from "./CustomerTableHeader";

/* -------------------------------------------------------------------------- */

const ItemsPerPageArray = [10, 20, 30];

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

  const DisplaySelectedUsers = () => (
    <p className="text-xs text-muted-text md:text-sm">
      Users {selectedUsersId.length} selected out of {users?.total}
    </p>
  );

  return (
    <>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <CustomerTableActions
          searchInput={searchInput}
          handleInputChange={handleInputChange}
          totalSelectedUsers={selectedUsersId.length}
        />

        <div className="custom_scroll_bar relative h-full max-h-max min-h-60 w-full overflow-auto bg-surface">
          <CustomerTableError isError={isError} />

          <Table className="w-full border-none">
            <CustomerTableHeader
              handleSelectAll={handleSelectAll}
              handleSort={handleSort}
              isAllUserSelected={isAllUserSelected}
            />

            <CustomerTableBody
              users={users?.users}
              isLoading={isLoading}
              handleCheck={handleCheck}
              selectedUsersId={selectedUsersId}
            />

            <CustomerDeleteConfirmation
              isLoading={isDeleteLoading}
              onDelete={handleDelete}
            />
          </Table>
        </div>
      </Dialog>

      <div className="flex w-full flex-wrap items-center justify-between gap-2 bg-surface p-5 md:flex-nowrap md:rounded-b-2xl">
        <div className="flex w-full items-center gap-4">
          <div className="flex w-full items-center justify-between gap-4 md:justify-normal">
            <TableItemsPerPageSelector
              defaultSelectedIndex={ItemsPerPageArray.indexOf(itemsPerPage)}
              defaultSelectedLabel={itemsPerPage.toString()}
              options={ItemsPerPageArray}
              onSelect={(index) => setItemsPerPage(ItemsPerPageArray[index])}
            />

            <DisplaySelectedUsers />
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
