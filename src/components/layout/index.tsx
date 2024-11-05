"use client"

import * as React from "react"
import Navbar from "./navbar"
import PageInfo from "./page-info"
import Sidebar from "./sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useScrollLockEffect } from "@/hooks/use-scroll-lock"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    isSidebarActive,
    setIsSidebarActive,
    NAVBAR_HEIGHT,
    SIDEBAR_WIDTH,
    SIDEBAR_CONTENT_WIDTH,
    PAGE_INFO_HEIGHT,
    SPACING_X,
  } = GetLayoutInfo()

  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Lock scroll when sidebar is active
  useScrollLockEffect(!isDesktop && isSidebarActive)

  const mainContainerStyles = isDesktop
    ? {
        paddingLeft: isSidebarActive
          ? `${SIDEBAR_WIDTH + SIDEBAR_CONTENT_WIDTH + SPACING_X}px`
          : SIDEBAR_WIDTH + SPACING_X,
        paddingRight: SPACING_X,
        transition: "padding-left 0.3s ease-out",
      }
    : undefined

  return (
    <div
      style={
        {
          "--navbar-height": `${NAVBAR_HEIGHT}px`,
          "--sidebar-width": `${SIDEBAR_WIDTH}px`,
          "--sidebar-content-width": `${SIDEBAR_CONTENT_WIDTH}px`,
          "--spacing-x": `${SPACING_X}px`,
          "--page-info-height": `${PAGE_INFO_HEIGHT}px`,
        } as React.CSSProperties
      }
    >
      {isSidebarActive && !isDesktop && (
        <div className="fixed inset-0 z-50 bg-black/75"></div>
      )}

      <Sidebar isOpen={isSidebarActive} setIsOpen={setIsSidebarActive} />

      <Navbar
        setIsSidebarActive={setIsSidebarActive}
        style={mainContainerStyles}
      />

      <div style={{ ...mainContainerStyles }}>
        <main className="relative pt-[var(--navbar-height)] md:px-5">
          {!isDesktop && <PageInfo className="hidden md:block" />}
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export const GetLayoutInfo = () => {
  const [isSidebarActive, setIsSidebarActive] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const SIDEBAR_CONTENT_WIDTH = isDesktop ? 288 : 244
  const SIDEBAR_WIDTH = isDesktop ? 70 : 60
  const NAVBAR_HEIGHT = isDesktop ? 84 : 64
  const PAGE_INFO_HEIGHT = 45
  const SPACING_X = 20

  return {
    isSidebarActive,
    setIsSidebarActive,
    SIDEBAR_CONTENT_WIDTH,
    SIDEBAR_WIDTH,
    NAVBAR_HEIGHT,
    PAGE_INFO_HEIGHT,
    SPACING_X,
  }
}

export default Layout
