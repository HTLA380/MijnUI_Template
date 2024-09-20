import React, { useState } from "react";

import { LuArrowRight } from "react-icons/lu";

import { SidebarData } from "@/_constants/SIDEBAR_DATA";

import { useMediaQuery } from "../../hooks/use-media-query";
import { cn } from "../../utils";
import ClickAwayListener from "../../utils/wrappers/ClickAwayListener";
import { Button } from "../_mijn-ui/Button";
import { SIDEBAR_CONTENT_WIDTH, SIDEBAR_WIDTH } from "../layout/Layout";
import Logo from "../logo/Logo";
import CollapsibleLists from "./CollapsibleList";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const [activeIndices, setActiveIndices] = useState<{ [key: number]: number }>({});
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const sidebarContainerStyle = isMobile ? { left: isOpen ? 0 : -SIDEBAR_WIDTH } : undefined;
  const sidebarPanelStyle = { width: isMobile ? `${SIDEBAR_WIDTH * 0.8}px` : `${SIDEBAR_WIDTH}px` };
  const sidebarContentStyle = isOpen
    ? {
        width: isMobile ? `${SIDEBAR_CONTENT_WIDTH * 0.9}px` : `${SIDEBAR_CONTENT_WIDTH}px`,
        opacity: 1,
        transition: "width 300ms ease-out, opacity 700ms ease-out",
      }
    : {
        width: "0px",
        overflow: "hidden",
        opacity: 0,
        transition: "width 300ms ease-out, opacity 700ms ease-out",
      };

  const currentSidebarData = SidebarData[currentMenuIndex];
  const currentActiveIndex = activeIndices[currentMenuIndex] ?? -1;

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <aside
        className="flex fixed inset-y-0 z-[99] left-0 bg-surface transition-[left] duration-300 ease-in-out shadow-md"
        style={sidebarContainerStyle}
      >
        <div className="pt-8 flex flex-col items-center gap-8" style={sidebarPanelStyle}>
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
                      "p-1.5 border-2 border-primary text-primary hover:bg-accent hover:text-primary [&>svg]:size-6",
                      index === currentMenuIndex && "bg-accent"
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
          className={`relative h-full gap-4 border-l border-l-main-border pt-8 flex flex-col`}
          style={sidebarContentStyle}
        >
          <h3 className="text-muted-text uppercase truncate text-xs font-semibold px-6">
            {currentSidebarData.contentTitle}
          </h3>

          <div className="px-6">
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
    className="size-7 p-0 rounded-default absolute bottom-20 right-0 translate-x-3.5 hidden md:flex"
    onClick={() => setIsOpen(!isOpen)}
  >
    <LuArrowRight className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
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
      index === currentMenuIndex ? "bg-accent text-primary hover:text-primary" : "text-muted-text",
      className
    )}
    title={title}
  >
    {icon}
  </Button>
);

export default Sidebar;
