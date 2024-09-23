"use client";

import * as React from "react";

import Link from "next/link";
import { FaCashRegister } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";

import { Button } from "@/mijn-ui/components/Button";
import { useMediaQuery } from "@/mijn-ui/hooks/use-media-query";
import { cn } from "@/mijn-ui/utils";

import Logo from "../logo/Logo";
import PageInfo from "../page-info/PageInfo";
import ThemeToggler from "../theme-toggler/ThemeToggler";
import LanguageSelector from "./LanguageSelector";
import Profile from "./Profile";
import VolumeToggler from "./VolumeToggler";

type NavbarProps = {
  style?: React.CSSProperties;
  setIsSidebarActive: (isOpen: boolean) => void;
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

const Navbar = ({ style, setIsSidebarActive }: NavbarProps) => {
  const [selectedLanguageIndex, setSelectedLanguageIndex] = React.useState(1);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 flex h-[var(--navbar-height)] w-full items-center justify-between backdrop-blur",
      )}
      style={{ ...style }}
    >
      <nav className="flex w-full items-center justify-between px-2 md:px-5">
        {isMobile ? (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsSidebarActive(true)}
              variant={"ghost"}
              size={"icon"}
            >
              <LuMenu size={20} />
            </Button>

            <Logo
              imgURL="/assets/images/pico.png"
              alt="PICO SBS"
              className="mt-1 flex size-8 items-center justify-center p-0"
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
            className="size-9 text-xs text-muted-text hover:text-secondary-text sm:size-10"
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
