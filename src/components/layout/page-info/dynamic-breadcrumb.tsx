import React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@mijn-ui/components/breadcrumbs"
import { cn } from "@mijn-ui/utils"
import { isExistingUrl } from "@/_constants/SIDEBAR_DATA"

/* -------------------------------------------------------------------------- */

type DynamicBreadcrumbProps = {
  paths: { name: string; link: string }[]
}

const DynamicBreadcrumb = ({ paths }: DynamicBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-1">
        {paths.map((path, index) => {
          const isLastItem = index === paths.length - 1
          const isPathExist = isExistingUrl(path.link)

          return (
            <React.Fragment key={path.name}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className={cn(
                    "text-xs capitalize",
                    !isPathExist &&
                      "hover:text-neutral-text/80 hover:no-underline",
                    isPathExist && isLastItem && "text-main-text",
                  )}
                >
                  {isPathExist ? (
                    <Link href={path.link}>{path.name}</Link>
                  ) : (
                    <p>{path.name}</p>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default DynamicBreadcrumb
