"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCashRegister } from "react-icons/fa";
import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";

import { getSidebarActiveTitle, isExistingUrl } from "@/_constants/SIDEBAR_DATA";
import { generatePaths } from "@/utils";

import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsSeparator } from "../_mijn-ui/Breadcrumbs";
import { Button } from "../_mijn-ui/Button";
import { Select, SelectContent, SelectOption, SelectTrigger } from "../_mijn-ui/Select";
import { cn } from "../_mijn-ui/utils";
import ThemeToggler from "../theme-toggler/ThemeToggler";

type NavbarProps = {
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

const Navbar = ({ setIsSidebarActive }: NavbarProps) => {
  const pathname = usePathname();

  const paths = React.useMemo(() => generatePaths(pathname), [pathname]);
  const title = React.useMemo(() => getSidebarActiveTitle(pathname), [pathname]);

  return (
    <header className="w-full flex items-center justify-between">
      <nav className="flex items-center w-full justify-between">
        <Button className="md:hidden" onClick={() => setIsSidebarActive(true)} variant={"ghost"} size={"icon"}>
          <LuMenu size={20} />
        </Button>

        <div>
          <h3 className="text-lg font-semibold">{title || "Pico Demo Business"}</h3>

          <DynamicBreadcrumbs paths={paths} />
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector LanguageOptions={LanguageOptions} />

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
        </div>
      </nav>
    </header>
  );
};

const VolumeToggler = () => {
  const [isActivated, setIsActivated] = React.useState(false);

  return (
    <Button
      onClick={() => setIsActivated((prev) => !prev)}
      size={"icon"}
      className={cn(isActivated ? "text-primary" : "text-muted-text")}
      variant={"surface"}
    >
      {isActivated ? <FaVolumeLow /> : <FaVolumeXmark />}
    </Button>
  );
};

type DynamicBreadcrumbsProps = {
  paths: { name: string; link: string }[];
};

const DynamicBreadcrumbs = ({ paths }: DynamicBreadcrumbsProps) => {
  return (
    <Breadcrumbs>
      {paths.map((path, index) => {
        const isLastItem = index === paths.length - 1;
        const isPathExist = isExistingUrl(path.link);

        return (
          <React.Fragment key={path.name}>
            <BreadcrumbsItem>
              <BreadcrumbsLink
                renderAs={isPathExist ? Link : "p"}
                href={path.link}
                className={cn(
                  "capitalize",
                  !isPathExist && "hover:no-underline hover:text-muted-text",
                  isPathExist && isLastItem && "text-main-text"
                )}
              >
                {path.name}
              </BreadcrumbsLink>
            </BreadcrumbsItem>
            {!isLastItem && <BreadcrumbsSeparator />}
          </React.Fragment>
        );
      })}
    </Breadcrumbs>
  );
};

type LanguageSelectorProps = {
  LanguageOptions: {
    name: string;
    alt: string;
    src: string;
  }[];
};

const LanguageSelector = ({ LanguageOptions }: LanguageSelectorProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  // TODO: add actual language change logic

  return (
    <Select placement="bottom-end" defaultSelectedIndex={1} onSelect={(index) => setSelectedIndex(index)}>
      <SelectTrigger className="bg-surface shadow-sm text-xs hover:bg-surface hover:text-secondary-text border-none w-24 gap-2 p-0">
        <span className="capitalize">{LanguageOptions[selectedIndex].name}</span>

        {selectedIndex !== null && (
          <Image
            src={LanguageOptions[selectedIndex].src}
            width={80}
            height={80}
            alt={LanguageOptions[selectedIndex].alt}
            className="size-4 rounded-md"
          />
        )}
      </SelectTrigger>
      <SelectContent className="w-36 border-none gap-1 p-3">
        {LanguageOptions.map((option) => (
          <SelectOption
            key={option.name}
            value={option.name}
            className="flex items-center gap-3 data-[active]:text-secondary-text data-[active]:bg-transparent data-[selected]:bg-accent data-[active]:data-[selected]:bg-accent data-[selected]:text-secondary-text truncate text-xs"
          >
            <Image src={option.src} width={80} height={80} alt={option.alt} className="size-4 rounded-md" />

            {option.name}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Navbar;
