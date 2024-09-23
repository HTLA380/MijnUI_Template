"use client";

import * as React from "react";

import Image from "next/image";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { LuMoreVertical } from "react-icons/lu";

import { Checkbox } from "@/mijn-ui/components/Checkbox";
import { Dialog, DialogTrigger } from "@/mijn-ui/components/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/mijn-ui/components/DropdownMenu";
import { TableCell, TableRow } from "@/mijn-ui/components/Table";
import { cn } from "@/mijn-ui/utils";

import { User } from "../types";
import CustomerDeleteConfirmation from "./CustomerDeleteConfirmation";

/* -------------------------------------------------------------------------- */

type UserRowProps = {
  user: User;
  handleCheck: (id: number) => void;
  selectedUsersId: Array<number>;
};

const UserRow = ({ user, handleCheck, selectedUsersId }: UserRowProps) => {
  const randomStatus = React.useMemo(() => getRandomStatus(), []);

  const generateRandomAmount = (): number => {
    return parseFloat((Math.random() * 901 + 100).toFixed(2));
  };

  const randomAmount = React.useMemo(() => generateRandomAmount(), []);

  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 25) + 1;
  };

  const randomNumber = React.useMemo(() => generateRandomNumber(), []);

  return (
    <TableRow
      onClick={() => handleCheck(user.id)}
      className={cn(
        "relative border-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-main-border",
      )}
    >
      <TableCell>
        <Checkbox
          className="border-muted-text"
          checked={selectedUsersId.includes(user.id)}
          onClick={(e) => e.stopPropagation()}
          onChange={() => handleCheck(user.id)}
        />
      </TableCell>

      <TableCell className="w-full min-w-44">
        <div className="flex items-center gap-2">
          <Image
            width={40}
            height={40}
            draggable="false"
            className="size-10 rounded-full bg-muted"
            src={`/assets/images/avatar/avatar-${randomNumber}.png`}
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

      <TableCell className="w-full min-w-44">
        <p className="w-44">{user.phone}</p>
      </TableCell>

      <TableCell className="w-full min-w-44">
        <p className="line-clamp-2 w-44">{user.company.name}</p>
      </TableCell>

      <TableCell className="min-w-32">
        <div className="text-sm">
          <p>Feb 17, 2024</p>
          <p className="text-xs text-disabled-text">08:48 AM</p>
        </div>
      </TableCell>

      <TableCell className="hidden w-full min-w-44 sm:table-cell">
        <p className="w-44 truncate">
          {user.address.address} {user.address.city}
        </p>
      </TableCell>

      <TableCell className="min-w-24">
        <p className="w-24 truncate">{randomAmount}$</p>
      </TableCell>

      <TableCell className="hidden min-w-44 sm:table-cell">
        <p className="w-44 truncate">{user.crypto.wallet}</p>
      </TableCell>

      <TableCell className="min-w-24">
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

      <TableCell className="sticky right-0 top-0 w-14 bg-surface/10 backdrop-blur">
        <Dialog>
          <DropdownMenu offset={{ alignmentAxis: 10 }} placement="left-start">
            <DropdownMenuTrigger className="border-none">
              <LuMoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuItem
                label="View"
                className="flex items-center gap-2 text-muted-text"
              >
                <FaEye /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                label="Edit"
                className="flex items-center gap-2 text-muted-text"
              >
                <FaEdit />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="h-auto p-0" label="delete">
                <DialogTrigger
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  renderAs="div"
                  className="flex w-full items-center justify-start gap-2 border-none text-muted-text"
                >
                  <FaTrash /> Delete
                </DialogTrigger>
              </DropdownMenuItem>
              <CustomerDeleteConfirmation onDelete={() => {}} />
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

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

export default UserRow;
