import React from "react";

import { TableBody as MijnUITableBody } from "@mijn-ui/components/table";
import { cn } from "@mijn-ui/utils";

import { User } from "../types";
import TableRow from "./table-row";
import TableRowSkeleton from "./table-row-skeleton";

/* -------------------------------------------------------------------------- */

type CustomerTableBodyProps = {
  users: User[] | undefined;
  handleCheck: (id: number) => void;
  selectedUsersId: number[];
  isLoading: boolean;
};

const TableBody = ({
  users,
  handleCheck,
  selectedUsersId,
  isLoading,
}: CustomerTableBodyProps) => {
  const renderLoadingSkeleton = Array.from(Array(10).keys()).map((_, index) => (
    <TableRowSkeleton key={index} />
  ));

  const renderCustomerRows = users?.map((user) => (
    <TableRow
      user={user}
      key={`customer-${user.id}`}
      handleCheck={handleCheck}
      selectedUsersId={selectedUsersId}
    />
  ));
  return (
    <MijnUITableBody
      className={cn({ "pointer-events-none opacity-60": isLoading })}
    >
      {isLoading ? renderLoadingSkeleton : renderCustomerRows}
    </MijnUITableBody>
  );
};

export default TableBody;
