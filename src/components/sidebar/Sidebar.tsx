import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { LuArrowRight } from "react-icons/lu";

import { SidebarData } from "@/_constants/SIDEBAR_DATA";

import { Button } from "../_mijn-ui/Button";
import { useMediaQuery } from "../_mijn-ui/hooks/use-media-query";
import ClickAwayListener from "../_mijn-ui/utils/wrappers/ClickAwayListener";
import { SIDEBAR_CONTENT_WIDTH, SIDEBAR_WIDTH } from "../layout/Layout";
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

  const sidebarPanelStyle = { width: isMobile ? `${SIDEBAR_WIDTH * 0.8}px` : `${SIDEBAR_WIDTH}px` };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <aside
        className="flex fixed inset-y-0 z-30 left-0 bg-surface transition-[left] duration-300 ease-in-out shadow-md"
        style={isMobile ? { left: isOpen ? 0 : -SIDEBAR_WIDTH } : undefined}
      >
        <div className="pt-8 flex flex-col items-center gap-8" style={sidebarPanelStyle}>
          <Button
            href={"/"}
            variant={"ghost"}
            size={"icon"}
            renderAs={Link}
            className="hover:bg-transparent size-12 p-1.5"
          >
            <Image src="/assets/images/pico.png" alt="Pico" width={50} height={50} className="w-full" />
          </Button>

          <div className="flex flex-col gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className="p-1.5 border-2 border-primary text-primary hover:bg-accent hover:text-primary"
              title="Apps"
              renderAs={Link}
              href={"/apps"}
            >
              <BsGrid3X3GapFill className="size-full" />
            </Button>

            {SidebarData.map((data, index) => (
              <Button
                key={data.title}
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  setCurrentMenuIndex(index);
                  setIsOpen(true);
                }}
                className={`text-base ${
                  index === currentMenuIndex ? "bg-accent text-primary hover:text-primary" : "text-muted-text"
                }`}
                title={data.title}
              >
                {data.icon}
              </Button>
            ))}
          </div>
        </div>

        <div
          className={`relative h-full gap-4 border-l border-l-main-border pt-8 flex flex-col`}
          style={sidebarContentStyle}
        >
          <h3 className="text-muted-text uppercase truncate text-xs font-semibold px-6">
            {SidebarData[currentMenuIndex].contentTitle}
          </h3>

          <div className="px-6">
            <CollapsibleLists
              key={currentMenuIndex}
              lists={SidebarData[currentMenuIndex].lists}
              activeIndex={activeIndices[currentMenuIndex] ?? -1}
              setActiveIndex={handleSetActiveIndex}
              onClick={setIsOpen}
            />
          </div>
        </div>

        <Button
          size={"icon"}
          className="size-7 p-0 rounded-default absolute bottom-20 right-0 translate-x-3.5 hidden md:flex"
          onClick={() => setIsOpen(!isOpen)}
        >
          <LuArrowRight className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </Button>
      </aside>
    </ClickAwayListener>
  );
};

export default Sidebar;
