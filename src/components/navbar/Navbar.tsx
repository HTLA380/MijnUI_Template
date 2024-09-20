"use client";

import * as React from "react";

import Link from "next/link";
import { FaCashRegister } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";

import { useMediaQuery } from "@/hooks/use-media-query";

import { useDetectScroll } from "../../hooks/useDetectScroll";
import { cn } from "../../utils";
import { Button } from "../_mijn-ui/Button";
import Logo from "../logo/Logo";
import PageInfo from "../page-info/PageInfo";
import ThemeToggler from "../theme-toggler/ThemeToggler";
import LanguageSelector from "./LanguageSelector";
import Profile from "./Profile";
import VolumeToggler from "./VolumeToggler";

type NavbarProps = {
  style?: React.CSSProperties;
  setIsSidebarActive: (isOpen: boolean) => void;
  NAVBAR_HEIGHT: number;
};

const LanguageOptions = [
  {
    name: "မြန်မာ",
    alt: "myanmar flag",
    src: "/assets/images/countries/myanmar.svg",
  },
  {
    name: "English",
    alt: "united-state flag",
    src: "/assets/images/countries/united-states.svg",
  },
  {
    name: "ภาษาไทย",
    alt: "thailand flag",
    src: "/assets/images/countries/thailand.svg",
  },
];

const Navbar = ({ style, setIsSidebarActive, NAVBAR_HEIGHT }: NavbarProps) => {
  const [selectedLanguageIndex, setSelectedLanguageIndex] = React.useState(1);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const isActive = useDetectScroll(NAVBAR_HEIGHT);

  return (
    <header
      className={cn("fixed inset-x-0 top-0 w-full flex items-center justify-between z-30", isActive && "backdrop-blur")}
      style={{ ...style, minHeight: `${NAVBAR_HEIGHT}px` }}
    >
      <nav className="flex px-5 items-center w-full justify-between">
        {isMobile ? (
          <div className="flex gap-2 items-center">
            <Button onClick={() => setIsSidebarActive(true)} variant={"ghost"} size={"icon"}>
              <LuMenu size={20} />
            </Button>

            <Logo
              imgURL="/assets/images/pico.png"
              alt="PICO SBS"
              className="size-8 p-0 mt-1 flex items-center justify-center"
            />
          </div>
        ) : (
          <PageInfo />
        )}

        <div className="flex items-center gap-2">
          {!isMobile && (
            <LanguageSelector
              selectedIndex={selectedLanguageIndex}
              onSelect={setSelectedLanguageIndex}
              LanguageOptions={LanguageOptions}
            />
          )}

          {/* currently this link is going to direct to the current page */}
          <Button
            renderAs={Link}
            href={"/"}
            size={"icon"}
            className="hover:text-secondary-text text-muted-text text-xs size-9 sm:size-10"
            variant={"surface"}
          >
            <FaCashRegister />
          </Button>

          <VolumeToggler />
          <ThemeToggler />
          <Profile
            selectedIndex={selectedLanguageIndex}
            onSelect={setSelectedLanguageIndex}
            LanguageOptions={LanguageOptions}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
