import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button, buttonStyles } from "@mijn-ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@mijn-ui/components/collapsible"
import { cn } from "@mijn-ui/utils"
import { SidebarListsType } from "@/_constants/SIDEBAR_DATA"
import { useMediaQuery } from "@/hooks/use-media-query"
import { LuChevronDown } from "react-icons/lu"
import { PiDotOutlineFill } from "react-icons/pi"

/* -------------------------------------------------------------------------- */

type CollapsibleListProps = {
  lists: SidebarListsType[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  onClick: (isOpen: boolean) => void
}

const CollapsibleLists = ({
  lists,
  activeIndex,
  setActiveIndex,
  onClick,
}: CollapsibleListProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const currentPath = usePathname()

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index)
  }

  const handleClick = () => {
    return isMobile && onClick(false)
  }

  if (!lists) return null

  return (
    <div className="flex w-full flex-col items-center">
      {lists.map(({ icon, title, list, link }, index) => {
        const isCollapsibleList = Array.isArray(list) && !link

        if (isCollapsibleList) {
          return (
            <Collapsible
              key={`list-${index}`}
              open={activeIndex === index}
              className="w-full"
              onOpenChange={() => handleToggle(index)}
            >
              <CollapsibleTrigger className="group flex w-full items-center gap-2 truncate px-4 py-2 text-sm text-neutral-text hover:text-primary data-[state=open]:text-primary">
                {icon && (
                  <CollapsibleIcon className="[&>svg]:size-3.5">
                    {icon}
                  </CollapsibleIcon>
                )}
                <div className="w-full flex-1 text-left">{title}</div>
                <LuChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-neutral-text duration-400 ease-in-out",
                    activeIndex === index && "rotate-180",
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent
                asChild
                className="overflow-hidden text-sm transition-[height] data-[state=closed]:animate-collapsible-collapse data-[state=open]:animate-collapsible-expand"
              >
                <ul>
                  {list?.map(({ name, link }, index) => (
                    <li
                      onClick={handleClick}
                      key={`list-item-${index}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-text hover:text-primary sm:pl-7"
                    >
                      <Link
                        href={link}
                        className={cn(
                          "flex w-full items-center gap-1 truncate",
                          link === currentPath && "text-primary",
                        )}
                      >
                        <CollapsibleIcon>
                          <PiDotOutlineFill />
                        </CollapsibleIcon>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          )
        }

        if (!link) {
          return (
            <Button
              variant={"text"}
              color="accent"
              key={`list-${index}`}
              onClick={handleClick}
              className="w-full justify-start gap-2 truncate px-3 text-neutral-text hover:bg-transparent hover:text-primary"
            >
              {icon && (
                <span className="flex size-5 flex-shrink-0 items-center justify-center [&>svg]:size-3.5">
                  {icon}
                </span>
              )}
              {title}
            </Button>
          )
        }

        return (
          <Link
            href={link}
            key={`list-${index}`}
            onClick={handleClick}
            className={cn(
              buttonStyles({ variant: "text", color: "accent" }),
              "w-full justify-start gap-2 truncate px-3 text-neutral-text hover:bg-transparent hover:text-primary",
              link === currentPath && "text-primary",
            )}
          >
            {icon && (
              <CollapsibleIcon className="[&>svg]:size-3.5">
                {icon}
              </CollapsibleIcon>
            )}
            {title}
          </Link>
        )
      })}
    </div>
  )
}

const CollapsibleIcon = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      className={cn(
        "flex size-5 flex-shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4",
        className,
      )}
      {...props}
    />
  )
}

export default CollapsibleLists
