"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCashRegister } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";

import { getSidebarActiveTitle } from "@/_constants/SIDEBAR_DATA";
import { generatePaths } from "@/utils";

import { useDetectScroll } from "../../hooks/useDetectScroll";
import { cn } from "../../utils";
import { Button } from "../_mijn-ui/Button";
import ThemeToggler from "../theme-toggler/ThemeToggler";
import DynamicBreadcrumbs from "./DynamicBreadcrumbs";
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

const NAVBAR_HEIGHT = 84;

const Navbar = ({ style, setIsSidebarActive }: NavbarProps) => {
  const pathname = usePathname();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = React.useState(1);

  const paths = React.useMemo(() => generatePaths(pathname), [pathname]);
  const title = React.useMemo(() => getSidebarActiveTitle(pathname), [pathname]);

  const isActive = useDetectScroll(NAVBAR_HEIGHT);

  return (
    <header
      className={cn("fixed inset-x-0 top-0 w-full flex items-center justify-between z-30", isActive && "backdrop-blur")}
      style={{ ...style, minHeight: `${NAVBAR_HEIGHT}px` }}
    >
      <nav className="flex items-center w-full justify-between">
        <Button className="md:hidden" onClick={() => setIsSidebarActive(true)} variant={"ghost"} size={"icon"}>
          <LuMenu size={20} />
        </Button>

        <div>
          <h3 className="text-lg font-semibold">{title || "Pico Demo Business"}</h3>
          <DynamicBreadcrumbs paths={paths} />
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector
            selectedIndex={selectedLanguageIndex}
            onSelect={setSelectedLanguageIndex}
            LanguageOptions={LanguageOptions}
          />

          {/* currently this link is going to direct to the current page */}
          <Button
            renderAs={Link}
            href={"/"}
            size={"icon"}
            className="hover:text-secondary-text text-muted-text text-xs"
            variant={"surface"}
          >
            <FaCashRegister />
          </Button>

          <VolumeToggler />
          <ThemeToggler />
          <Profile />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
