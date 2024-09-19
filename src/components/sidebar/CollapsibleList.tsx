"use client";

import * as React from "react";

import Link from "next/link";
import { PiDotOutlineFill } from "react-icons/pi";

import { SidebarListsType } from "../../_constants/SIDEBAR_DATA";
import { Button } from "../_mijn-ui/Button";
import { useMediaQuery } from "../_mijn-ui/hooks/use-media-query";
import {
  ListItem,
  ListItemContent,
  ListItemIcon,
  ListSubMenu,
  ListSubMenuContent,
  ListSubMenuTrigger,
} from "../_mijn-ui/List";

type CollapsibleListProps = {
  lists: SidebarListsType[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onClick: (isOpen: boolean) => void;
};

const CollapsibleLists = ({ lists, activeIndex, setActiveIndex, onClick }: CollapsibleListProps) => {
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
              <ListSubMenuTrigger className="data-[state=open]:bg-transparent data-[state=open]:text-primary hover:bg-transparent hover:text-primary data-[state=open]:hover:bg-transparent text-muted-text data-[state=open]:hover:text-primary truncate">
                {icon && <ListItemIcon className="[&>svg]:size-3.5">{icon}</ListItemIcon>}

                <ListItemContent>{title}</ListItemContent>
              </ListSubMenuTrigger>

              <ListSubMenuContent animateOnMount={animateOnMount} className="w-full">
                {list?.map(({ name, link }, index) => (
                  <ListItem
                    onClick={handleClick}
                    key={`list-item-${index}`}
                    className="pl-7 hover:text-primary text-muted-text"
                  >
                    <Link href={link} className="flex items-center w-full gap-1 truncate">
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
              className="hover:bg-transparent hover:text-primary w-full justify-start truncate gap-2 px-3 text-muted-text"
            >
              {icon && <ListItemIcon className="[&>svg]:size-3.5">{icon}</ListItemIcon>}
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
            className="hover:bg-transparent hover:text-primary w-full justify-start truncate gap-2 px-3 text-muted-text"
          >
            {icon && <ListItemIcon className="[&>svg]:size-3.5">{icon}</ListItemIcon>}
            {title}
          </Button>
        );
      })}
    </div>
  );
};

export default CollapsibleLists;
