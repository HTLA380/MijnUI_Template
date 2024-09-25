import React, { useState } from "react";

import { LuArrowRight } from "react-icons/lu";
import { SidebarData } from "~/_constants/SIDEBAR_DATA";

import { Button } from "@/mijn-ui/components/Button";
import { useMediaQuery } from "@/mijn-ui/hooks/use-media-query";
import { cn } from "@/mijn-ui/utils";
import ClickAwayListener from "@/mijn-ui/utils/wrappers/ClickAwayListener";

import Logo from "../logo/Logo";
import CollapsibleLists from "./CollapsibleList";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const [activeIndices, setActiveIndices] = useState<{ [key: number]: number }>(
    {},
  );
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleSetActiveIndex = (index: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [currentMenuIndex]: index,
    }));
  };

  const handleSidebarIconClick = (index: number) => {
    setCurrentMenuIndex(index);
    setIsOpen(true);
  };

  const currentSidebarData = SidebarData[currentMenuIndex];
  const currentActiveIndex = activeIndices[currentMenuIndex] ?? -1;

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <aside
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "group fixed inset-y-0 left-0 z-[99] flex bg-surface shadow-md transition-[left] duration-300 ease-in-out",
          !isDesktop &&
            "data-[state=closed]:-left-[var(--sidebar-content-width)]",
        )}
      >
        <div className="flex w-[var(--sidebar-width)] flex-col items-center gap-8 pt-8">
          <Logo imgURL="/assets/images/pico.png" alt="PICO SBS" />

          <div className="flex flex-col gap-2">
            {SidebarData.map((data, index) => {
              const isAppsData = data.title === "Apps";

              if (isAppsData) {
                return (
                  <SidebarIcon
                    key={data.title}
                    variant={"outline"}
                    index={index}
                    title={data.title}
                    icon={data.icon}
                    onClick={handleSidebarIconClick}
                    currentMenuIndex={currentMenuIndex}
                    className={cn(
                      "border-2 border-primary p-1.5 text-primary hover:bg-accent hover:text-primary [&>svg]:size-6",
                      index === currentMenuIndex && "bg-accent",
                    )}
                  />
                );
              }

              return (
                <SidebarIcon
                  key={data.title}
                  index={index}
                  title={data.title}
                  icon={data.icon}
                  onClick={handleSidebarIconClick}
                  currentMenuIndex={currentMenuIndex}
                />
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "group-data-[state=open]:opacity-1 relative flex h-full flex-col gap-4 overflow-y-auto border-l border-l-main-border py-8 transition-[width_300ms,opacity_700ms] duration-300 ease-out group-data-[state=closed]:w-0 group-data-[state=open]:w-[var(--sidebar-content-width)] group-data-[state=closed]:overflow-hidden group-data-[state=closed]:opacity-0",
          )}
        >
          <h3 className="truncate px-6 text-xs font-semibold uppercase text-muted-text">
            {currentSidebarData.contentTitle}
          </h3>

          <div className="px-3 md:px-6">
            <CollapsibleLists
              key={currentMenuIndex}
              lists={currentSidebarData.lists}
              activeIndex={currentActiveIndex ?? -1}
              setActiveIndex={handleSetActiveIndex}
              onClick={setIsOpen}
            />
          </div>
        </div>

        <SidebarToggler isOpen={isOpen} setIsOpen={setIsOpen} />
      </aside>
    </ClickAwayListener>
  );
};

/* -------------------------------------------------------------------------- */

type SidebarTogglerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SidebarToggler = ({ isOpen, setIsOpen }: SidebarTogglerProps) => (
  <Button
    size={"icon"}
    className="absolute bottom-20 right-0 hidden size-7 translate-x-3.5 rounded-default p-0 md:flex"
    onClick={() => setIsOpen(!isOpen)}
  >
    <LuArrowRight
      className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
    />
  </Button>
);

/* -------------------------------------------------------------------------- */

type SidebarIconProps = {
  variant?: "outline" | "ghost";
  title: string;
  icon: React.ReactNode;
  index: number;
  currentMenuIndex: number;
  onClick?: (index: number) => void;
  className?: string;
};

const SidebarIcon = ({
  title,
  icon,
  index,
  currentMenuIndex,
  onClick,
  variant = "ghost",
  className,
}: SidebarIconProps) => (
  <Button
    key={title}
    variant={variant}
    size={"icon"}
    onClick={() => onClick?.(index)}
    className={cn(
      "text-base",
      index === currentMenuIndex
        ? "bg-accent text-primary hover:text-primary"
        : "text-muted-text",
      className,
    )}
    title={title}
  >
    {icon}
  </Button>
);

export default Sidebar;
