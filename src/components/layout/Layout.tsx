"use client";

import * as React from "react";

import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

export const SIDEBAR_CONTENT_WIDTH = 288;
export const SIDEBAR_WIDTH = 70;
export const SPACING_X = 40;
export const SPACING_Y = 20;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarActive, setIsSidebarActive] = React.useState(false);

  return (
    <div>
      <Sidebar isOpen={isSidebarActive} setIsOpen={setIsSidebarActive} />
      <div
        className=""
        style={{
          paddingLeft: isSidebarActive
            ? `${SIDEBAR_WIDTH + SIDEBAR_CONTENT_WIDTH + SPACING_X}px`
            : SIDEBAR_WIDTH + SPACING_X,
          paddingRight: SPACING_X,
          paddingTop: SPACING_Y,
          transition: "padding-left 0.3s ease-out",
        }}
      >
        <Navbar />
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
