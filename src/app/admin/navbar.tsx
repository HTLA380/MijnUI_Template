"use client"

import React from "react"
import { Button } from "@mijn-ui/components/button"
import LanguageSelector from "@/components/layout/navbar/language-selector"
import Profile from "@/components/layout/navbar/profile"
import ThemeToggler from "@/components/layout/theme-toggler"
import { CURRENT_USER, LANGUAGE_OPTIONS } from "@/_constants/NAVBAR_DATA"
import { useMediaQuery } from "@/hooks/use-media-query"
import { FaCashRegister } from "react-icons/fa"

const Navbar = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    LANGUAGE_OPTIONS[0].name,
  )
  const isMobile = useMediaQuery("(max-width: 768px)")

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
              selectedLanguage={selectedLanguage}
              onValueChange={setSelectedLanguage}
              LanguageOptions={LANGUAGE_OPTIONS}
            />
          )}

          <Button
            size={"icon"}
            className="size-9 text-xs text-neutral-text hover:text-secondary-text sm:size-10"
            color={"surface"}
          >
            <FaCashRegister />
          </Button>

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
  )
}

export default Navbar
