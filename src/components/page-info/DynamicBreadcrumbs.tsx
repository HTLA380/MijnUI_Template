import React from "react";

import Link from "next/link";

import { isExistingUrl } from "@/_constants/SIDEBAR_DATA";

import { cn } from "../../utils";
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsSeparator } from "../_mijn-ui/Breadcrumbs";

type DynamicBreadcrumbsProps = {
  paths: { name: string; link: string }[];
};

const DynamicBreadcrumbs = ({ paths }: DynamicBreadcrumbsProps) => {
  return (
    <Breadcrumbs>
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
  );
};

export default DynamicBreadcrumbs;
