"use client";

import * as React from "react";

import { LuChevronsUpDown } from "react-icons/lu";
import TableItemsPerPageSelector from "~/components/table/TableItemsPerPageSelector";
import TablePaginator from "~/components/table/TablePaginatior";

import { Checkbox } from "@/mijn-ui/components/Checkbox";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/mijn-ui/components/Table";
import useDebounce from "@/mijn-ui/hooks/use-debounce";
import { cn } from "@/mijn-ui/utils";

import { useFetchUsers } from "../hooks/use-fetch-customers";
import CustomerRowSkeleton from "./CustomerRowSkeleton";
import CustomerTableActions from "./CustomerTableActions";
import UserRow from "./CustomerTableRow";
import { CustomerTableHeaderItems } from "./data";

/* -------------------------------------------------------------------------- */

const ItemsPerPageArray = [10, 20, 30];

const CustomerTable: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(
    ItemsPerPageArray[0],
  );
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [sorting, setSorting] = React.useState({
    column: "firstName",
    order: "asc",
  });
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [selectedUsersId, setSelectedUsersId] = React.useState<number[]>([]);
  const [isAllUserSelected, setIsAllUserSelected] =
    React.useState<boolean>(false);
  const debouncedSearchInput = useDebounce(searchInput, 300);

  const {
    data: users,
    isLoading,
    isFetching,
    isError,
  } = useFetchUsers(itemsPerPage, currentPage, sorting, debouncedSearchInput);

  const handleCheck = (id: number) => {
    setSelectedUsersId((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setIsAllUserSelected(!isAllUserSelected);
    setSelectedUsersId(
      !isAllUserSelected ? users?.users.map((user) => user.id) || [] : [],
    );
  };

  const handleSort = () => {
    setSorting((prev) => ({
      column: prev.column,
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = async () => {
    setSelectedUsersId([]);
    setIsAllUserSelected(false);
    alert("Deleted Users");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex max-h-screen w-full flex-col items-center pb-5 pt-[var(--navbar-height)]">
      <CustomerTableActions
        handleDelete={handleDelete}
        selectedUsersId={selectedUsersId}
        inputValue={searchInput}
        handleInputChange={handleInputChange}
      />

      <div className="custom_scroll_bar relative h-full max-h-max min-h-60 w-full overflow-auto bg-surface">
        <Error isError={isError} />

        <Table className="w-full border-none">
          <TableHeader className="sticky left-0 top-0 z-10 bg-surface">
            <TableRow className="border-none">
              <TableHeaderCell>
                <Checkbox
                  className="border-muted-text"
                  checked={isAllUserSelected}
                  onChange={handleSelectAll}
                />
              </TableHeaderCell>

              {CustomerTableHeaderItems.map((cell) => (
                <TableHeaderCell
                  key={cell.name}
                  onClick={cell.sortable ? handleSort : undefined}
                  className={cn(
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

          <TableBody
            className={cn({ "pointer-events-none opacity-60": isFetching })}
          >
            {isLoading
              ? Array.from(Array(10).keys()).map((_, index) => (
                  <CustomerRowSkeleton key={index} />
                ))
              : users?.users.map((user) => (
                  <UserRow
                    user={user}
                    key={`customer-${user.id}`}
                    handleCheck={handleCheck}
                    selectedUsersId={selectedUsersId}
                  />
                ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex w-full items-center justify-between rounded-b-2xl bg-surface p-5">
        <div className="flex items-center gap-4">
          <TableItemsPerPageSelector
            defaultSelectedIndex={ItemsPerPageArray.indexOf(itemsPerPage)}
            defaultSelectedLabel={itemsPerPage.toString()}
            options={ItemsPerPageArray}
            onSelect={(index) => setItemsPerPage(ItemsPerPageArray[index])}
          />

          <p className="text-sm text-muted-text">
            Users {selectedUsersId.length} selected out of {users?.total}
          </p>
        </div>
        <TablePaginator
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onChangePage={setCurrentPage}
          total={users?.total}
        />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const Error = ({ isError }: { isError: boolean }) => {
  if (!isError) return;

  return (
    <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-danger-text">
      Something went wrong! please try again...
    </p>
  );
};

export default CustomerTable;
