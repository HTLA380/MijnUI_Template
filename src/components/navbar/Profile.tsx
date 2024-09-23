import React from "react";

import Image from "next/image";

import { Avatar } from "@/mijn-ui/components/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/mijn-ui/components/DropdownMenu";
import { useMediaQuery } from "@/mijn-ui/hooks/use-media-query";

type ProfileProps = {
  LanguageOptions: {
    name: string;
    alt: string;
    src: string;
  }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const Profile = ({
  LanguageOptions,
  selectedIndex,
  onSelect,
}: ProfileProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 420px)");

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger style={{ all: "unset" }}>
        <Avatar
          className="x size-9 cursor-pointer hover:brightness-75 sm:size-10"
          src=""
          name="PICO"
          alt="pico"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 gap-0 border-none">
        <div className="space-y-1.5 p-2 md:space-y-3 md:p-4">
          <div className="flex items-center gap-4">
            <Avatar
              className="cursor-pointer hover:brightness-75"
              src=""
              name="PICO"
              alt="pico"
            />
            <div>
              <p className="text-sm font-semibold">PICO SBS</p>
              <p className="text-xs text-muted-text">operator</p>
            </div>
          </div>

          <DropdownMenuItem
            className="hover:text-secondary-text"
            label="profile"
          >
            My Profile
          </DropdownMenuItem>
        </div>

        {/* ------------------------ Mobile language Selector ------------------------ */}

        <div className="h-px w-full bg-main-border md:hidden"></div>

        <div className="p-2 md:hidden md:p-4">
          <DropdownMenu placement={isSmallScreen ? "bottom" : "left-start"}>
            <DropdownMenuTrigger className="w-full justify-between gap-2 border-none bg-surface hover:text-secondary-text data-[focus-inside]:bg-accent data-[focus-inside]:text-secondary-text">
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
        {/* ------------------------ End of Mobile language Selector ------------------------ */}

        <div className="h-px w-full bg-main-border"></div>
        <div className="p-2 md:p-4">
          <DropdownMenuItem
            className="hover:text-secondary-text"
            label="signout"
          >
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
