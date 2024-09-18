"use client";

import * as React from "react";

import Link from "next/link";
import { PiDotOutlineFill } from "react-icons/pi";

import { Button } from "../_mijn-ui/Button";
import {
  ListItem,
  ListItemContent,
  ListItemIcon,
  ListSubMenu,
  ListSubMenuContent,
  ListSubMenuTrigger,
} from "../_mijn-ui/List";
import { SidebarListsType } from "./_data";

type CollapsibleListProps = {
  lists: SidebarListsType[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const CollapsibleLists = ({ lists, activeIndex, setActiveIndex }: CollapsibleListProps) => {
  const [animateOnMount, setAnimateOnMount] = React.useState(false);

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
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
              <ListSubMenuTrigger className="data-[state=open]:bg-transparent data-[state=open]:text-primary hover:bg-transparent hover:text-primary data-[state=open]:hover:bg-transparent text-disabled-text data-[state=open]:hover:text-primary truncate">
                {icon && <ListItemIcon className="[&>svg]:size-3.5">{icon}</ListItemIcon>}

                <ListItemContent>{title}</ListItemContent>
              </ListSubMenuTrigger>

              <ListSubMenuContent animateOnMount={animateOnMount} className="w-full">
                {list?.map(({ name, link }, index) => (
                  <ListItem key={`list-item-${index}`} className="pl-7 hover:text-primary text-disabled-text">
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
              className="hover:bg-transparent hover:text-primary w-full justify-start truncate gap-2 px-3 text-disabled-text"
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
            className="hover:bg-transparent hover:text-primary w-full justify-start truncate gap-2 px-3 text-disabled-text"
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
