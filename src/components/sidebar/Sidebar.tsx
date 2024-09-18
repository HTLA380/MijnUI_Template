"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { LuArrowRight } from "react-icons/lu";

import { Button } from "../_mijn-ui/Button";
import { cn } from "../_mijn-ui/utils";
import ClickAwayListener from "../_mijn-ui/utils/wrappers/ClickAwayListener";
import { SIDEBAR_CONTENT_WIDTH, SIDEBAR_WIDTH } from "../layout/Layout";
import { SidebarData } from "./_data";
import CollapsibleLists from "./CollapsibleList";

/* -------------------------------------------------------------------------- */

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [currentMenuIndex, setCurrentMenuIndex] = React.useState(0);
  const [activeIndices, setActiveIndices] = React.useState<{ [key: number]: number }>({});

  const handleSetActiveIndex = (index: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [currentMenuIndex]: index,
    }));
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <aside className="flex fixed inset-y-0 left-0 bg-surface shadow-md">
        <div className="pt-8 flex flex-col items-center gap-8" style={{ width: SIDEBAR_WIDTH }}>
          {/* logo */}

          <Button
            href={"/"}
            variant={"ghost"}
            size={"icon"}
            renderAs={Link}
            className="hover:bg-transparent size-12 p-1.5"
          >
            <Image src="/assets/images/pico.png" alt="Pico" width={100} height={100} className="w-full" />
          </Button>

          {/* sidebar buttons */}
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
                className={cn(
                  "text-base",
                  index === currentMenuIndex ? "bg-accent text-primary hover:text-primary" : "text-disabled-text"
                )}
                title={data.title}
              >
                {data.icon}
              </Button>
            ))}
          </div>
        </div>

        {/* sidebar content */}
        <div
          className={cn("relative h-full gap-4 border-l border-l-main-border pt-8 flex flex-col")}
          style={
            isOpen
              ? {
                  width: `${SIDEBAR_CONTENT_WIDTH}px`,
                  opacity: 1,
                  transition: "width 300ms ease-out, opacity 900ms ease-out",
                }
              : {
                  width: "0px",
                  overflow: "hidden",
                  opacity: 0,
                  transition: "width 300ms ease-out, opacity 900ms ease-out",
                }
          }
        >
          <h3 className="text-muted-text uppercase truncate text-xs font-semibold px-6">
            {SidebarData[currentMenuIndex].contentTitle}
          </h3>

          <div className={cn("px-6")}>
            <CollapsibleLists
              key={currentMenuIndex}
              lists={SidebarData[currentMenuIndex].lists}
              activeIndex={activeIndices[currentMenuIndex] ?? -1}
              setActiveIndex={handleSetActiveIndex}
            />
          </div>
        </div>

        {/* sidebar toggler */}
        <Button
          size={"icon"}
          className="size-7 p-0 rounded-default absolute bottom-20 right-0 translate-x-3.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <LuArrowRight className={cn(isOpen ? "rotate-180" : "rotate-0")} />
        </Button>
      </aside>
    </ClickAwayListener>
  );
};

export default Sidebar;
