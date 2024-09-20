"use client";

import * as React from "react";

import { useMediaQuery } from "../../hooks/use-media-query";
import { useScrollLockEffect } from "../../hooks/use-scroll-lock";
import Navbar from "../navbar/Navbar";
import PageInfo from "../page-info/PageInfo";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarActive, setIsSidebarActive] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const SIDEBAR_CONTENT_WIDTH = isMobile ? 244 : 288;
  const SIDEBAR_WIDTH = isMobile ? 60 : 70;
  const NAVBAR_HEIGHT = isMobile ? 64 : 84;
  const SPACING_X = 20;

  useScrollLockEffect(isMobile && isSidebarActive);

  const mainContainerStyles = isMobile
    ? { paddingTop: NAVBAR_HEIGHT, paddingLeft: SPACING_X, paddingRight: SPACING_X }
    : {
        paddingLeft: isSidebarActive
          ? `${SIDEBAR_WIDTH + SIDEBAR_CONTENT_WIDTH + SPACING_X}px`
          : SIDEBAR_WIDTH + SPACING_X,
        paddingRight: SPACING_X,
        transition: "padding-left 0.3s ease-out",
      };

  return (
    <div>
      {isSidebarActive && <div className="z-50 fixed md:hidden inset-0 bg-black/75"></div>}

      <Sidebar
        SIDEBAR_WIDTH={SIDEBAR_WIDTH}
        SIDEBAR_CONTENT_WIDTH={SIDEBAR_CONTENT_WIDTH}
        isOpen={isSidebarActive}
        setIsOpen={setIsSidebarActive}
      />

      <Navbar
        NAVBAR_HEIGHT={NAVBAR_HEIGHT}
        setIsSidebarActive={setIsSidebarActive}
        style={isMobile ? undefined : mainContainerStyles}
      />

      <div style={mainContainerStyles}>
        <main className="relative px-3 md:px-5">
          {isMobile && <PageInfo />}
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
