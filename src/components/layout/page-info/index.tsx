"use client";

import React, { useEffect } from "react";

import { usePathname } from "next/navigation";
import { getSidebarActiveInfo } from "@/_constants/SIDEBAR_DATA";
import { generatePaths } from "@/utils/generate";

import { cn } from "@mijn-ui/utils";

import DynamicBreadcrumb from "./dynamic-breadcrumb";

/* -------------------------------------------------------------------------- */

type PageInfoProps = {
  fallbackTitle?: string;
  className?: string;
};

const PageInfo = ({ fallbackTitle, className }: PageInfoProps) => {
  const pathname = usePathname();
  const paths = React.useMemo(() => generatePaths(pathname), [pathname]);
  const activeSidebarInfo = React.useMemo(
    () => getSidebarActiveInfo(pathname),
    [pathname],
  );

  useEffect(() => {
    document.title =
      activeSidebarInfo?.title || fallbackTitle || "Pico Demo Business";
  }, [activeSidebarInfo?.title, fallbackTitle]);

  return (
    <div className={cn("h-[var(--page-info-height)]", className)}>
      <h3 className="text-base font-semibold md:text-lg">
        {activeSidebarInfo?.title || fallbackTitle || "Pico Demo Business"}
      </h3>
      <DynamicBreadcrumb paths={paths} />
    </div>
  );
};

export default PageInfo;
