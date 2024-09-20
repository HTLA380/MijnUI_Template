"use client";

import * as React from "react";

import { useMediaQuery } from "../../hooks/use-media-query";
import { useScrollLockEffect } from "../../hooks/use-scroll-lock";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

export const SIDEBAR_CONTENT_WIDTH = 288;
export const SIDEBAR_WIDTH = 70;
export const SPACING_X = 40;
export const SPACING_Y = 20;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarActive, setIsSidebarActive] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useScrollLockEffect(isMobile && isSidebarActive);

  const mainContainerStyles = {
    paddingLeft: isSidebarActive ? `${SIDEBAR_WIDTH + SIDEBAR_CONTENT_WIDTH + SPACING_X}px` : SIDEBAR_WIDTH + SPACING_X,
    paddingRight: SPACING_X,
    paddingTop: SPACING_Y,
    paddingBottom: SPACING_Y,
    transition: "padding-left 0.3s ease-out",
  };

  return (
    <div>
      {isSidebarActive && <div className="z-20 fixed md:hidden inset-0 bg-black/75"></div>}

      <Sidebar isOpen={isSidebarActive} setIsOpen={setIsSidebarActive} />

      <Navbar setIsSidebarActive={setIsSidebarActive} style={mainContainerStyles} />

      <div style={!isMobile ? mainContainerStyles : undefined}>
        <main className="relative">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
