import React from "react";

import { TableBody } from "@/mijn-ui/components/Table";
import { cn } from "@/mijn-ui/utils";

import { User } from "../types";
import CustomerRow from "./CustomerTableRow";
import CustomerRowSkeleton from "./CustomerTableRowSkeleton";

/* -------------------------------------------------------------------------- */

type CustomerTableBodyProps = {
  users: User[] | undefined;
  handleCheck: (id: number) => void;
  selectedUsersId: number[];
  isLoading: boolean;
};

const CustomerTableBody = ({
  users,
  handleCheck,
  selectedUsersId,
  isLoading,
}: CustomerTableBodyProps) => {
  const renderLoadingSkeleton = Array.from(Array(10).keys()).map((_, index) => (
    <CustomerRowSkeleton key={index} />
  ));

  const renderCustomerRows = users?.map((user) => (
    <CustomerRow
      user={user}
      key={`customer-${user.id}`}
      handleCheck={handleCheck}
      selectedUsersId={selectedUsersId}
    />
  ));
  return (
    <TableBody className={cn({ "pointer-events-none opacity-60": isLoading })}>
      {isLoading ? renderLoadingSkeleton : renderCustomerRows}
    </TableBody>
  );
};

export default CustomerTableBody;
