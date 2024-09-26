import React from "react";

import Image from "next/image";
import { CURRENT_USER_TYPE } from "~/_constants/NAVBAR_DATA";

import { Avatar, AvatarProps } from "@/mijn-ui/components/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/mijn-ui/components/DropdownMenu";
import { useMediaQuery } from "@/mijn-ui/hooks/use-media-query";
import { useResponsiveVariant } from "@/mijn-ui/hooks/use-responsive-variant";

/* -------------------------------------------------------------------------- */

type ProfileProps = {
  LanguageOptions: {
    name: string;
    alt: string;
    src: string;
  }[];
  user: CURRENT_USER_TYPE;
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const Profile = ({
  user,
  LanguageOptions,
  selectedIndex,
  onSelect,
}: ProfileProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 420px)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const avatarSize = useResponsiveVariant<AvatarProps["size"]>({
    initial: "sm",
    md: "md",
  });

  const renderUserInfo = (
    <div className="flex items-center gap-4">
      <Avatar
        size={avatarSize}
        className="cursor-pointer hover:brightness-75"
        src={user.avatar}
        name={user.name}
        alt={user.alt}
      />
      <div>
        <p className="text-default font-semibold md:text-sm">{user.name}</p>
        <p className="text-xs text-muted-text">{user.role}</p>
      </div>
    </div>
  );

  const renderLanguageSelector = (
    <div className="p-2 md:p-4">
      <DropdownMenu placement={isSmallScreen ? "bottom" : "left-start"}>
        <DropdownMenuTrigger className="h-8 w-full justify-between gap-2 border-none bg-surface text-xs hover:text-secondary-text data-[focus-inside]:bg-accent data-[focus-inside]:text-secondary-text md:h-9 md:text-sm">
          <span className="capitalize">
            {LanguageOptions[selectedIndex].name}
          </span>

          {selectedIndex !== null && (
            <Image
              src={LanguageOptions[selectedIndex].src}
              width={80}
              height={80}
              alt={LanguageOptions[selectedIndex].alt}
              className="size-4 rounded-md"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 gap-1 border-none p-3">
          {LanguageOptions.map((option, index) => (
            <DropdownMenuItem
              key={option.name}
              label={option.name}
              className="flex items-center gap-3 truncate text-xs hover:text-secondary-text"
              onClick={() => onSelect(index)}
            >
              <Image
                src={option.src}
                width={80}
                height={80}
                alt={option.alt}
                className="size-4 rounded-md"
              />

              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger style={{ all: "unset" }}>
        <Avatar
          size={avatarSize}
          className="x size-9 cursor-pointer hover:brightness-75 sm:size-10"
          src={user.avatar}
          name={user.name}
          alt={user.alt}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 gap-0 border-none md:w-64">
        <div className="space-y-1.5 p-2 md:space-y-3 md:p-4">
          {renderUserInfo}

          <DropdownMenuItem
            className="text-xs hover:text-secondary-text md:text-sm"
            label="profile"
          >
            My Profile
          </DropdownMenuItem>
        </div>

        {isMobile && (
          <>
            <Divider />
            {renderLanguageSelector}
          </>
        )}

        <Divider />

        <div className="p-2 md:p-4">
          <DropdownMenuItem
            className="text-xs hover:text-secondary-text md:text-sm"
            label="signout"
          >
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Divider = () => <div className="h-px w-full bg-main-border"></div>;

export default Profile;
