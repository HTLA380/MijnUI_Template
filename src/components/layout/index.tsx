"use client"

import * as React from "react"
import Navbar from "./navbar"
import PageInfo from "./page-info"
import Sidebar from "./sidebar"
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect"
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

  // Set the body CSS variables for the layout to allow the children elements to use the variables and create custom layouts.
  useBodyStyles({
    "--navbar-height": `${NAVBAR_HEIGHT}px`,
    "--sidebar-width": `${SIDEBAR_WIDTH}px`,
    "--sidebar-content-width": `${SIDEBAR_CONTENT_WIDTH}px`,
    "--spacing-x": `${SPACING_X}px`,
    "--page-info-height": `${PAGE_INFO_HEIGHT}px`,
  })

  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Lock scroll when sidebar is active
  useScrollLockEffect(!isDesktop && isSidebarActive)

  const mainContainerStyles = isDesktop
    ? {
        paddingLeft: isSidebarActive
          ? `${SIDEBAR_WIDTH + SIDEBAR_CONTENT_WIDTH + SPACING_X}px`
          : SIDEBAR_WIDTH + SPACING_X,
        paddingRight: SPACING_X,
        transition: "padding-left 0.25s ease-out",
      }
    : undefined

  return (
    <>
      {isSidebarActive && !isDesktop && (
        <div className="fixed inset-0 z-50 bg-black/75"></div>
      )}

      <Sidebar isOpen={isSidebarActive} setIsOpen={setIsSidebarActive} />

      <Navbar
        setIsSidebarActive={setIsSidebarActive}
        style={mainContainerStyles}
      />

      <main
        className="relative pt-[var(--navbar-height)] md:px-5"
        style={{ ...mainContainerStyles }}
      >
        {!isDesktop && <PageInfo className="hidden md:block" />}
        {children}
      </main>
    </>
  )
}

/* -------------------------------------------------------------------------- */

export const useBodyStyles = (styles: Record<string, string>) => {
  useIsomorphicLayoutEffect(() => {
    Object.entries(styles).forEach(([key, value]) => {
      document.body.style.setProperty(key, value)
    })

    return () => {
      Object.keys(styles).forEach((key) => {
        document.body.style.removeProperty(key)
      })
    }
  }, [styles])
}

/* -------------------------------------------------------------------------- */

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
