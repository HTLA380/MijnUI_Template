"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu } from "react-icons/lu";
import { TbSlashes } from "react-icons/tb";

import { getSidebarActiveTitle, isExistingUrl } from "@/_constants/SIDEBAR_DATA";
import { generatePaths } from "@/utils";

import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsSeparator } from "../_mijn-ui/Breadcrumbs";
import { Button } from "../_mijn-ui/Button";
import { Select, SelectContent, SelectOption, SelectTrigger } from "../_mijn-ui/Select";
import { cn } from "../_mijn-ui/utils";

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
  const isDashboardPage = pathname === "/home/dashboard";

  return (
    <header className="w-full flex items-center justify-between">
      <nav className="flex items-center w-full justify-between">
        <Button className="md:hidden" onClick={() => setIsSidebarActive(true)} variant={"ghost"} size={"icon"}>
          <LuMenu size={20} />
        </Button>

        <div>
          <h3 className="text-lg font-semibold">{title || "Pico Demo Business"}</h3>

          {isDashboardPage ? (
            <Breadcrumbs>
              <BreadcrumbsItem>
                <BreadcrumbsLink className="capitalize hover:no-underline hover:text-muted-text">Home</BreadcrumbsLink>
              </BreadcrumbsItem>
              <BreadcrumbsSeparator />
              <BreadcrumbsItem>
                <BreadcrumbsLink renderAs={Link} href="/home/dashboard" className="capitalize text-main-text">
                  Dashboard
                </BreadcrumbsLink>
              </BreadcrumbsItem>
            </Breadcrumbs>
          ) : (
            <Breadcrumbs>
              <BreadcrumbsItem>
                <BreadcrumbsLink renderAs={Link} href="/" className="capitalize">
                  Dashboard
                </BreadcrumbsLink>
              </BreadcrumbsItem>

              <span className="h-4 w-4 -ml-1 mr-1">
                <TbSlashes className="w-full h-full" />
              </span>

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
          )}
        </div>

        <div>
          <LanguageSelector LanguageOptions={LanguageOptions} />
        </div>
      </nav>
    </header>
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
      <SelectTrigger className="bg-surface shadow-sm hover:bg-surface hover:text-blue-500 border-none w-24 gap-2 p-0">
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
            className="flex items-center gap-3 data-[active]:text-blue-500 data-[active]:bg-transparent data-[selected]:bg-accent data-[active]:data-[selected]:bg-accent data-[selected]:text-blue-500 truncate"
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
