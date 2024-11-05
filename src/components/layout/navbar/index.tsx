"use client";
import * as React from "react";

import { FaCashRegister } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import {
  CURRENT_USER,
  DEFAULT_SELECTED_LANGUAGE,
  LANGUAGE_OPTIONS,
} from "@/_constants/NAVBAR_DATA";

import { Button } from "@mijn-ui/components/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@mijn-ui/utils";

import Logo from "../../common/logo";
import PageInfo from "../page-info";
import ThemeToggler from "../theme-toggler";
import LanguageSelector from "./language-selector";
import Profile from "./profile";
import VolumeToggler from "./volume-toggler";

/* -------------------------------------------------------------------------- */

type NavbarProps = {
  style?: React.CSSProperties;
  setIsSidebarActive: (isOpen: boolean) => void;
};

const Navbar = ({ style, setIsSidebarActive }: NavbarProps) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>(
    DEFAULT_SELECTED_LANGUAGE,
  );

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const renderSidebarToggleMenu = (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setIsSidebarActive(true)}
        variant="text"
        color="accent"
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
  );

  return (
    <header
      className={cn(
        "preview fixed inset-x-0 top-0 z-30 flex h-[var(--navbar-height)] w-full items-center justify-between backdrop-blur",
      )}
      style={{ ...style }}
    >
      <nav className="flex w-full items-center justify-between px-2 md:px-5">
        {isDesktop ? <PageInfo /> : renderSidebarToggleMenu}

        <div className="flex w-fit items-center gap-2">
          {!isMobile && (
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onValueChange={setSelectedLanguage}
              LanguageOptions={LANGUAGE_OPTIONS}
            />
          )}

          <Button
            size={"icon"}
            className="size-9 hover:text-primary"
            color="surface"
          >
            <FaCashRegister />
          </Button>

          <VolumeToggler />
          <ThemeToggler />
          <Profile
            user={CURRENT_USER}
            selectedLanguage={selectedLanguage}
            onSelect={setSelectedLanguage}
            LanguageOptions={LANGUAGE_OPTIONS}
          />
        </div>
      </nav>
    </header>
  );
};

/* -------------------------------------------------------------------------- */

export default Navbar;
