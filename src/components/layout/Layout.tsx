"use client";

import * as React from "react";

import { useMediaQuery } from "@/mijn-ui/hooks/use-media-query";
import { useScrollLockEffect } from "@/mijn-ui/hooks/use-scroll-lock";

import Navbar from "../navbar/Navbar";
import PageInfo from "../page-info/PageInfo";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    SPACING_X,
    NAVBAR_HEIGHT,
    SIDEBAR_WIDTH,
    SIDEBAR_CONTENT_WIDTH,
    isSidebarActive,
    setIsSidebarActive,
  } = GetLayoutInfo();

  useScrollLockEffect(isMobile && isSidebarActive);

  const mainContainerStyles = isMobile
    ? { paddingLeft: SPACING_X, paddingRight: SPACING_X }
    : {
        paddingLeft: isSidebarActive
          ? `${SIDEBAR_WIDTH + SIDEBAR_CONTENT_WIDTH + SPACING_X}px`
          : SIDEBAR_WIDTH + SPACING_X,
        paddingRight: SPACING_X,
        transition: "padding-left 0.3s ease-out",
      };

  return (
    <div
      style={
        {
          "--navbar-height": `${NAVBAR_HEIGHT}px`,
          "--sidebar-width": `${SIDEBAR_WIDTH}px`,
          "--sidebar-content-width": `${SIDEBAR_CONTENT_WIDTH}px`,
          "--spacing-x": `${SPACING_X}px`,
        } as React.CSSProperties
      }
    >
      {isSidebarActive && (
        <div className="fixed inset-0 z-50 bg-black/75 md:hidden"></div>
      )}

      <Sidebar isOpen={isSidebarActive} setIsOpen={setIsSidebarActive} />

      <Navbar
        setIsSidebarActive={setIsSidebarActive}
        style={mainContainerStyles}
      />

      <div style={{ ...mainContainerStyles }}>
        <main className="relative px-3 md:px-5">
          {isMobile && <PageInfo />}
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export const GetLayoutInfo = () => {
  const [isSidebarActive, setIsSidebarActive] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const SIDEBAR_CONTENT_WIDTH = isMobile ? 244 : 288;
  const SIDEBAR_WIDTH = isMobile ? 60 : 70;
  const NAVBAR_HEIGHT = isMobile ? 64 : 84;
  const SPACING_X = 20;

  return {
    isSidebarActive,
    setIsSidebarActive,
    SIDEBAR_CONTENT_WIDTH,
    SIDEBAR_WIDTH,
    NAVBAR_HEIGHT,
    SPACING_X,
  };
};

export default Layout;
