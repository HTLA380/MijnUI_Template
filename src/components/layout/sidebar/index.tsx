import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, buttonStyles } from "@mijn-ui/components/button"
import { cn } from "@mijn-ui/utils"
import Logo from "../../common/logo"
import CollapsibleLists from "./collapsible-list"
import { SidebarData, getSidebarActiveInfo } from "@/_constants/SIDEBAR_DATA"
import { useMediaQuery } from "@/hooks/use-media-query"
import ClickAwayListener from "@/utils/click-away-listener"
import { BsGrid3X3GapFill } from "react-icons/bs"
import { LuArrowRight } from "react-icons/lu"

/* -------------------------------------------------------------------------- */

type SidebarProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const path = usePathname()

  // Get active menu and collapsible indices
  const activeSidebarInfo = getSidebarActiveInfo(path)

  // State for current menu index
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(
    activeSidebarInfo?.index || 0,
  )

  // State for active indices of collapsible lists
  const [activeIndices, setActiveIndices] = useState<{ [key: number]: number }>(
    {
      [currentMenuIndex]: activeSidebarInfo?.collapsibleIndex || -1,
    },
  )

  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const handleSetActiveIndex = (index: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [currentMenuIndex]: index,
    }))
  }

  const handleSidebarIconClick = (index: number) => {
    setCurrentMenuIndex(index)
    setIsOpen(true)
  }

  const currentSidebarData = SidebarData[currentMenuIndex]
  const currentActiveIndex = activeIndices[currentMenuIndex] ?? -1

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <aside
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "group fixed inset-y-0 left-0 z-50 flex bg-surface shadow-md transition-[left] duration-300 ease-in-out",
          !isDesktop &&
            "data-[state=closed]:-left-[var(--sidebar-content-width)]",
        )}
      >
        <div className="flex w-[var(--sidebar-width)] flex-col items-center gap-8 pt-8">
          <Logo imgURL="/assets/images/pico.png" alt="PICO SBS" />

          <div className="flex flex-col gap-2">
            <Link
              href={"/admin/app-panel"}
              className={cn(
                buttonStyles({
                  variant: "outline",
                  color: "accent",
                  size: "icon",
                }),
                "border-primary bg-accent/80 text-primary hover:text-primary",
              )}
              title={"App"}
            >
              <BsGrid3X3GapFill size={20} />
            </Link>

            {SidebarData.map((data, index) => (
              <SidebarIcon
                key={data.title}
                index={index}
                title={data.title}
                icon={data.icon}
                onClick={handleSidebarIconClick}
                currentMenuIndex={currentMenuIndex}
              />
            ))}
          </div>
        </div>

        <div
          className={cn(
            "group-data-[state=open]:opacity-1 relative flex h-full flex-col gap-4 overflow-y-auto border-l border-l-main-border py-8 transition-[width_300ms,opacity_700ms] duration-300 ease-out group-data-[state=closed]:w-0 group-data-[state=open]:w-[var(--sidebar-content-width)] group-data-[state=closed]:overflow-hidden group-data-[state=closed]:opacity-0",
          )}
        >
          <h3 className="truncate px-6 text-xs font-semibold uppercase text-neutral-text">
            {currentSidebarData?.contentTitle}
          </h3>

          <div className="px-3 md:px-6">
            <CollapsibleLists
              key={currentMenuIndex}
              lists={currentSidebarData?.lists}
              activeIndex={currentActiveIndex ?? -1}
              setActiveIndex={handleSetActiveIndex}
              onClick={setIsOpen}
            />
          </div>
        </div>

        <SidebarToggler isOpen={isOpen} setIsOpen={setIsOpen} />
      </aside>
    </ClickAwayListener>
  )
}

/* -------------------------------------------------------------------------- */

type SidebarTogglerProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

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
)

/* -------------------------------------------------------------------------- */

type SidebarIconProps = {
  variant?: "outline" | "text"
  title: string
  icon: React.ReactNode
  index: number
  currentMenuIndex: number
  onClick?: (index: number) => void
  className?: string
}

const SidebarIcon = ({
  title,
  icon,
  index,
  currentMenuIndex,
  onClick,
  variant = "text",
  className,
}: SidebarIconProps) => (
  <Button
    key={title}
    variant={variant}
    color="accent"
    size={"icon"}
    onClick={() => onClick?.(index)}
    className={cn(
      "text-base",
      index === currentMenuIndex
        ? "bg-accent/80 text-primary hover:text-primary"
        : "text-neutral-text",
      className,
    )}
    title={title}
  >
    {icon}
  </Button>
)

export default Sidebar
