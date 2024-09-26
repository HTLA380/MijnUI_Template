import React from "react";

import Link from "next/link";
import { ALL_APPS } from "~/_constants/PAGES";
import Greeting from "~/app/admin/app-panel/Greeting";

import { Button } from "@/mijn-ui/components/Button";

const AppPanel = () => {
  return (
    <main className="flex h-screen w-full justify-center py-32">
      <div className="flex h-full w-full max-w-screen-lg flex-col gap-6 md:gap-12">
        <Greeting />

        <div className="custom_scroll_bar grid h-full w-full grid-cols-3 items-center justify-center gap-3 overflow-y-auto p-5 sm:grid-cols-4 sm:gap-6 sm:p-10 md:grid-cols-5 lg:grid-cols-6">
          {ALL_APPS.map((app) => (
            <div
              key={app.title}
              className="group flex flex-col items-center justify-center gap-3"
            >
              <Button
                renderAs={Link}
                href={app.link}
                className="aspect-square h-full w-full max-w-20 border border-transparent bg-surface text-accent-text/70 backdrop-blur transition-all duration-300 ease-out hover:bg-surface group-hover:scale-110 group-hover:border-primary/30 group-hover:text-primary group-hover:[box-shadow:_0_0_50px_5px_rgba(255,160,92,0.1)] dark:text-muted-text sm:max-w-28 [&>svg]:size-8"
              >
                {app.icon}
              </Button>
              <Link
                href={app.link}
                className={"text-xs sm:text-sm md:text-base"}
              >
                {app.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AppPanel;
