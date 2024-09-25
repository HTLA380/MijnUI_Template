"use client";

import React, { useEffect } from "react";

import { usePathname } from "next/navigation";
import { getSidebarActiveTitle } from "~/_constants/SIDEBAR_DATA";
import { generatePaths } from "~/utils";

import { cn } from "@/mijn-ui/utils";

import DynamicBreadcrumbs from "./DynamicBreadcrumbs";

/* -------------------------------------------------------------------------- */

type PageInfoProps = {
  fallbackTitle?: string;
  className?: string;
};

const PageInfo = ({ fallbackTitle, className }: PageInfoProps) => {
  const pathname = usePathname();
  const paths = React.useMemo(() => generatePaths(pathname), [pathname]);
  const title = React.useMemo(
    () => getSidebarActiveTitle(pathname),
    [pathname],
  );

  useEffect(() => {
    document.title = title || fallbackTitle || "Pico Demo Business";
  }, [title, fallbackTitle]);

  return (
    <div className={cn("h-[var(--page-info-height)]", className)}>
      <h3 className="text-base font-semibold md:text-lg">
        {title || fallbackTitle || "Pico Demo Business"}
      </h3>
      <DynamicBreadcrumbs paths={paths} />
    </div>
  );
};

export default PageInfo;
