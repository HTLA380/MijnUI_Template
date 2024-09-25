import React from "react";

import Link from "next/link";
import { isExistingUrl } from "~/_constants/SIDEBAR_DATA";

import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsSeparator,
} from "@/mijn-ui/components/Breadcrumbs";
import { cn } from "@/mijn-ui/utils";

/* -------------------------------------------------------------------------- */

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
                  !isPathExist && "hover:text-muted-text hover:no-underline",
                  isPathExist && isLastItem && "text-main-text",
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
