"use client";

import React from "react";

import { FaCashRegister } from "react-icons/fa";
import { CURRENT_USER, LANGUAGE_OPTIONS } from "~/_constants/NAVBAR_DATA";
import LanguageSelector from "~/components/navbar/LanguageSelector";
import Profile from "~/components/navbar/Profile";
import ThemeToggler from "~/components/theme-toggler/ThemeToggler";

import { Button } from "@/mijn-ui/components/Button";
import { useMediaQuery } from "@/mijn-ui/hooks";

const Navbar = () => {
  const [selectedLanguageIndex, setSelectedLanguageIndex] = React.useState(1);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-20 w-full items-center justify-between backdrop-blur-sm">
      <nav className="flex w-full items-center justify-between px-5 py-2">
        <h3 className="font-bold uppercase">All Apps</h3>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-success">
            Beta: v0.0.1
          </div>

          {!isMobile && (
            <LanguageSelector
              selectedIndex={selectedLanguageIndex}
              onSelect={setSelectedLanguageIndex}
              LanguageOptions={LANGUAGE_OPTIONS}
            />
          )}

          <Button
            size={"icon"}
            className="size-9 text-xs text-muted-text hover:text-secondary-text sm:size-10"
            variant={"surface"}
          >
            <FaCashRegister />
          </Button>

          <ThemeToggler />
          <Profile
            user={CURRENT_USER}
            selectedIndex={selectedLanguageIndex}
            onSelect={setSelectedLanguageIndex}
            LanguageOptions={LANGUAGE_OPTIONS}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
