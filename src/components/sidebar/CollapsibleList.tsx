"use client";

import * as React from "react";

import Link from "next/link";
import { PiDotOutlineFill } from "react-icons/pi";

import { Button } from "@/mijn-ui/components/Button";
import {
  ListItem,
  ListItemContent,
  ListItemIcon,
  ListSubMenu,
  ListSubMenuContent,
  ListSubMenuTrigger,
} from "@/mijn-ui/components/List";
import { useMediaQuery } from "@/mijn-ui/hooks/use-media-query";

import { SidebarListsType } from "../../_constants/SIDEBAR_DATA";

type CollapsibleListProps = {
  lists: SidebarListsType[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onClick: (isOpen: boolean) => void;
};

const CollapsibleLists = ({
  lists,
  activeIndex,
  setActiveIndex,
  onClick,
}: CollapsibleListProps) => {
  const [animateOnMount, setAnimateOnMount] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const handleClick = () => {
    return isMobile && onClick(false);
  };

  if (!lists) return null;

  return (
    <div className="flex w-full flex-col items-center">
      {lists.map(({ icon, title, list, link }, index) => {
        const isCollapsibleList = Array.isArray(list) && !link;

        if (isCollapsibleList) {
          return (
            <ListSubMenu
              key={`list-${index}`}
              open={activeIndex === index}
              onToggle={() => {
                handleToggle(index);
                setAnimateOnMount(true);
              }}
            >
              <ListSubMenuTrigger className="truncate text-muted-text hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-primary">
                {icon && (
                  <ListItemIcon className="[&>svg]:size-3.5">
                    {icon}
                  </ListItemIcon>
                )}

                <ListItemContent>{title}</ListItemContent>
              </ListSubMenuTrigger>

              <ListSubMenuContent
                animateOnMount={animateOnMount}
                className="w-full"
              >
                {list?.map(({ name, link }, index) => (
                  <ListItem
                    onClick={handleClick}
                    key={`list-item-${index}`}
                    className="pl-4 text-muted-text hover:text-primary sm:pl-7"
                  >
                    <Link
                      href={link}
                      className="flex w-full items-center gap-1 truncate"
                    >
                      <ListItemIcon>
                        <PiDotOutlineFill />
                      </ListItemIcon>
                      {name}
                    </Link>
                  </ListItem>
                ))}
              </ListSubMenuContent>
            </ListSubMenu>
          );
        }

        if (!link) {
          return (
            <Button
              variant={"ghost"}
              key={`list-${index}`}
              onClick={handleClick}
              className="w-full justify-start gap-2 truncate px-3 text-muted-text hover:bg-transparent hover:text-primary"
            >
              {icon && (
                <ListItemIcon className="[&>svg]:size-3.5">{icon}</ListItemIcon>
              )}
              {title}
            </Button>
          );
        }

        return (
          <Button
            renderAs={Link}
            variant={"ghost"}
            href={link}
            key={`list-${index}`}
            onClick={handleClick}
            className="w-full justify-start gap-2 truncate px-3 text-muted-text hover:bg-transparent hover:text-primary"
          >
            {icon && (
              <ListItemIcon className="[&>svg]:size-3.5">{icon}</ListItemIcon>
            )}
            {title}
          </Button>
        );
      })}
    </div>
  );
};

export default CollapsibleLists;
