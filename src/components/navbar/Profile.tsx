import React from "react";

import { Avatar } from "../_mijn-ui/Avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../_mijn-ui/DropdownMenu";

const Profile = () => {
  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger style={{ all: "unset" }}>
        <Avatar className="cursor-pointer hover:brightness-75" src="" name="PICO" alt="pico" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none w-64">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-4">
            <Avatar className="cursor-pointer hover:brightness-75" src="" name="PICO" alt="pico" />
            <div>
              <p className="text-sm font-semibold">PICO SBS</p>
              <p className="text-xs text-muted-text">operator</p>
            </div>
          </div>

          <DropdownMenuItem className="hover:text-secondary-text" label="profile">
            My Profile
          </DropdownMenuItem>
        </div>

        <div className="h-px w-full bg-main-border"></div>

        <div className="p-4">
          <DropdownMenuItem className="hover:text-secondary-text" label="signout">
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
