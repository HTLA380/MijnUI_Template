"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbSlashes } from "react-icons/tb";

import { getSidebarActiveTitle, isExistingUrl } from "@/_constants/SIDEBAR_DATA";
import { generatePaths } from "@/utils";

import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsSeparator } from "../_mijn-ui/Breadcrumbs";
import { cn } from "../_mijn-ui/utils";

const Navbar = () => {
  const pathname = usePathname();

  const paths = React.useMemo(() => generatePaths(pathname), [pathname]);
  const title = React.useMemo(() => getSidebarActiveTitle(pathname), [pathname]);
  const isDashboardPage = pathname === "/home/dashboard";

  return (
    <header className="w-full flex items-center justify-between">
      <nav>
        <h3 className="text-lg font-semibold">{title || "Pico Demo Business"}</h3>

        {isDashboardPage ? (
          <Breadcrumbs>
            <BreadcrumbsItem>
              <BreadcrumbsLink className="capitalize hover:no-underline hover:text-muted-text">Home</BreadcrumbsLink>
            </BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem>
              <BreadcrumbsLink renderAs={Link} href="/home/dashboard" className="capitalize text-main-text">
                Dashboard
              </BreadcrumbsLink>
            </BreadcrumbsItem>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs>
            <BreadcrumbsItem>
              <BreadcrumbsLink renderAs={Link} href="/" className="capitalize">
                Dashboard
              </BreadcrumbsLink>
            </BreadcrumbsItem>

            <span className="h-4 w-4 -ml-1 mr-1">
              <TbSlashes className="w-full h-full" />
            </span>

            {paths.map((path, index) => {
              const isLastItem = index === paths.length - 1;
              const isPathExist = isExistingUrl(path.link);

              return (
                <React.Fragment key={path.name}>
                  <BreadcrumbsItem>
                    <BreadcrumbsLink
                      renderAs={isPathExist ? Link : "p"}
                      href={path.link}
                      className={cn(
                        "capitalize",
                        !isPathExist && "hover:no-underline hover:text-muted-text",
                        isPathExist && isLastItem && "text-main-text"
                      )}
                    >
                      {path.name}
                    </BreadcrumbsLink>
                  </BreadcrumbsItem>
                  {!isLastItem && <BreadcrumbsSeparator />}
                </React.Fragment>
              );
            })}
          </Breadcrumbs>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
