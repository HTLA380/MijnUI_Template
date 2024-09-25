import * as React from "react";

import Image from "next/image";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { LuMoreVertical } from "react-icons/lu";

import { Checkbox } from "@/mijn-ui/components/Checkbox";
import { DialogTrigger } from "@/mijn-ui/components/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/mijn-ui/components/DropdownMenu";
import { TableCell, TableRow } from "@/mijn-ui/components/Table";
import { cn } from "@/mijn-ui/utils";

import { User } from "../types";

/* -------------------------------------------------------------------------- */

type CustomerRowProps = {
  user: User;
  handleCheck: (id: number) => void;
  selectedUsersId: number[];
};

const CustomerRow = ({
  user,
  handleCheck,
  selectedUsersId,
}: CustomerRowProps) => {
  const randomStatus = React.useMemo(() => getRandomStatus(), []);
  const randomTotalAmount = React.useMemo(() => getRandomTotalAmount(), []);
  const randomDateAndTime = React.useMemo(() => getRandomDateTime(), []);
  const randomImageIndex = React.useMemo(() => getRandomImageIndex(), []);

  const commonClasses = "w-full px-3 py-2 text-xs md:px-4 md:py-3 md:text-sm";

  const renderCustomer = (
    <TableCell className={cn(commonClasses, "min-w-44")}>
      <div className="flex items-center gap-2">
        <Image
          width={40}
          height={40}
          draggable="false"
          className="size-10 rounded-full bg-muted"
          src={`/assets/images/avatar/avatar-${randomImageIndex}.png`}
          alt={user.firstName}
        />
        <div>
          <p className="w-44 truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="max-w-32 truncate text-xs text-disabled-text">
            {user.email}
          </p>
        </div>
      </div>
    </TableCell>
  );

  const renderCheckbox = (
    <TableCell>
      <Checkbox
        className="size-[1.125rem] border-muted-text md:size-5 [&+span>svg]:size-[0.7rem] md:[&+span>svg]:size-4"
        checked={selectedUsersId.includes(user.id)}
        onClick={(e) => e.stopPropagation()}
        onChange={() => handleCheck(user.id)}
      />
    </TableCell>
  );

  const renderPhoneNumber = (
    <TableCell className={cn(commonClasses, "md:min-w-44")}>
      <p className="md:w-44">{user.phone}</p>
    </TableCell>
  );

  const renderCompany = (
    <TableCell className={cn(commonClasses, "md:min-w-44")}>
      <p className="line-clamp-2 truncate md:w-44">{user.company.name}</p>
    </TableCell>
  );

  const renderDate = (
    <TableCell className={cn(commonClasses, "md:min-w-32")}>
      <div>
        <p>{randomDateAndTime.date}</p>
        <p className="text-xs text-disabled-text">{randomDateAndTime.time}</p>
      </div>
    </TableCell>
  );

  const renderAddress = (
    <TableCell className={cn(commonClasses, "hidden min-w-44 sm:table-cell")}>
      <p className="truncate md:w-44">
        {user.address.address} {user.address.city}
      </p>
    </TableCell>
  );

  const renderTotalAmount = (
    <TableCell className={cn(commonClasses, "md:min-w-24")}>
      <p className="truncate md:w-24">{randomTotalAmount}$</p>
    </TableCell>
  );

  const renderTransition = (
    <TableCell className={cn(commonClasses, "hidden min-w-44 sm:table-cell")}>
      <p className="truncate md:w-44">{user.crypto.wallet}</p>
    </TableCell>
  );

  const renderStatus = (
    <TableCell className={cn(commonClasses, "md:min-w-24")}>
      <div className="flex items-center gap-2 text-xs text-muted-text">
        <span
          className={cn(
            "block h-2 w-2 rounded-full ring-2",
            randomStatus?.backgroundColor,
            randomStatus?.ringColor,
          )}
        />
        <p>{randomStatus?.name}</p>
      </div>
    </TableCell>
  );

  const renderMoreActions = (
    <TableCell className="sticky right-0 top-0 w-14 bg-surface/10 px-2 py-1 text-xs backdrop-blur md:px-4 md:py-3 md:text-sm">
      <DropdownMenu offset={{ alignmentAxis: 10 }} placement="left-start">
        <DropdownMenuTrigger className="border-none bg-transparent hover:bg-transparent">
          <LuMoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuItem
            label="View"
            className="flex items-center gap-2 text-xs text-muted-text md:text-sm"
          >
            <FaEye /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            label="Edit"
            className="flex items-center gap-2 text-xs text-muted-text md:text-sm"
          >
            <FaEdit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="h-auto p-0 text-xs md:text-sm"
            label="delete"
          >
            <DialogTrigger
              onClick={(e) => {
                e.stopPropagation();
              }}
              renderAs="div"
              className="flex h-auto w-full items-center justify-start gap-2 border-none py-2 text-xs text-muted-text md:text-sm"
            >
              <FaTrash /> Delete
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );

  return (
    <TableRow
      onClick={() => handleCheck(user.id)}
      className={cn(
        "relative border-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-main-border",
      )}
    >
      {renderCheckbox}
      {renderCustomer}
      {renderPhoneNumber}
      {renderCompany}
      {renderDate}
      {renderAddress}
      {renderTotalAmount}
      {renderTransition}
      {renderStatus}
      {renderMoreActions}
    </TableRow>
  );
};

export default CustomerRow;

/* -------------------------------------------------------------------------- */

const getRandomStatus = () => {
  const status = [
    {
      backgroundColor: "bg-green-500",
      ringColor: "ring-green-500/30",
      name: "Paid",
    },
    {
      backgroundColor: "bg-yellow-500",
      ringColor: "ring-yellow-500/30",
      name: "Pending",
    },
    {
      backgroundColor: "bg-red-500",
      ringColor: "ring-red-500/30",
      name: "Returned",
    },
  ];

  const randomIndex = Math.floor(Math.random() * status.length);
  return status[randomIndex];
};
/* -------------------------------------------------------------------------- */

const getRandomImageIndex = (): number => {
  return Math.floor(Math.random() * 25) + 1;
};

/* -------------------------------------------------------------------------- */

const getRandomTotalAmount = (): number => {
  return parseFloat((Math.random() * 901 + 100).toFixed(2));
};

/* -------------------------------------------------------------------------- */

function getRandomDateTime() {
  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate(),
  );
  const randomDate = new Date(
    lastMonth.getTime() +
      Math.random() * (today.getTime() - lastMonth.getTime()),
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = `${months[randomDate.getMonth()]} ${randomDate.getDate()}, ${randomDate.getFullYear()}`;

  let hours = randomDate.getHours();
  const minutes = randomDate.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const time = `${hours}:${minutes} ${ampm}`;

  return { date, time };
}
