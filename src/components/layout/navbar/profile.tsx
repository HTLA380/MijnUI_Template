import React from "react";
import Image from "next/image";
import { CURRENT_USER_TYPE } from "@/_constants/NAVBAR_DATA";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from "@mijn-ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarVariantProps,
} from "@mijn-ui/components/avatar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useResponsiveVariant } from "@/hooks/use-responsive-variant";

/* -------------------------------------------------------------------------- */

type ProfileProps = {
  LanguageOptions: {
    name: string;
    alt: string;
    src: string;
  }[];
  user: CURRENT_USER_TYPE;
  selectedLanguage: string;
  onSelect: (value: string) => void;
};

const Profile = ({
  user,
  LanguageOptions,
  selectedLanguage,
  onSelect,
}: ProfileProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const avatarSize = useResponsiveVariant<AvatarVariantProps["size"]>({
    initial: "sm",
    md: "md",
  });

  const renderUserAvatar = (
    <Avatar size={avatarSize}>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback className="size-9 cursor-pointer hover:brightness-75 sm:size-10">
        {user.name.substring(0, 1)}
      </AvatarFallback>
    </Avatar>
  );

  const renderUserInfo = (
    <div className="flex items-center gap-4">
      {renderUserAvatar}
      <div>
        <p className="text-default font-semibold md:text-sm">{user.name}</p>
        <p className="text-xs text-neutral-text">{user.role}</p>
      </div>
    </div>
  );

  const selectedLanguageData =
    LanguageOptions.find((option) => option.name === selectedLanguage) ||
    LanguageOptions[0];

  const renderLanguageSelector = (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="[&>svg]:hidden">
        <div className="flex items-center gap-2 text-xs/6">
          <Image
            src={selectedLanguageData.src}
            width={80}
            height={80}
            alt={selectedLanguageData.alt}
            className="size-4 rounded-md"
          />

          {selectedLanguageData.name}
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {LanguageOptions.map((option) => (
            <DropdownMenuItem
              key={option.name}
              onClick={() => onSelect(option.name)}
            >
              <div className="flex items-center gap-2 text-xs/6">
                <Image
                  src={option.src}
                  width={80}
                  height={80}
                  alt={option.alt}
                  className="size-4 rounded-md"
                />

                {option.name}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderUserAvatar}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 gap-0 md:w-64" align="end">
        <DropdownMenuGroup className="space-y-2 p-2 md:space-y-3 md:p-2">
          {renderUserInfo}
          <DropdownMenuItem>My Profile</DropdownMenuItem>

          {isMobile && (
            <>
              <DropdownMenuSeparator />
              {renderLanguageSelector}
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="p-2">
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
