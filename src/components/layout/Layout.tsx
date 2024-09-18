"use client";

import * as React from "react";

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

export const SIDEBAR_CONTENT_WIDTH = 288;
export const SIDEBAR_WIDTH = 70;
export const SPACING = 20;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarActive, setIsSidebarActive] = React.useState(false);

  return (
    <div>
      <Sidebar isOpen={isSidebarActive} setIsOpen={setIsSidebarActive} />
      <div
        className=""
        style={{
          paddingLeft: isSidebarActive
            ? `${SIDEBAR_WIDTH + SIDEBAR_CONTENT_WIDTH + SPACING}px`
            : SIDEBAR_WIDTH + SPACING,
          transition: "padding-left 0.3s ease-out",
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
