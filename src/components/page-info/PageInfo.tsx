"use client";

import React from "react";

import { usePathname } from "next/navigation";
import { getSidebarActiveTitle } from "~/_constants/SIDEBAR_DATA";
import { generatePaths } from "~/utils";

import DynamicBreadcrumbs from "./DynamicBreadcrumbs";

type PageInfoProps = {
  fallbackTitle?: string;
};

const PageInfo = ({ fallbackTitle }: PageInfoProps) => {
  const pathname = usePathname();
  const paths = React.useMemo(() => generatePaths(pathname), [pathname]);
  const title = React.useMemo(
    () => getSidebarActiveTitle(pathname),
    [pathname],
  );

  return (
    <div>
      <h3 className="text-lg font-semibold">
        {title || fallbackTitle || "Pico Demo Business"}
      </h3>
      <DynamicBreadcrumbs paths={paths} />
    </div>
  );
};

export default PageInfo;
