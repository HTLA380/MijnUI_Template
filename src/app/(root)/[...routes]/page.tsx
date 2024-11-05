"use client";

import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { getExistingApps } from "@/_constants/PAGES";
import { isExistingUrl } from "@/_constants/SIDEBAR_DATA";

export default function UnderConstruction() {
  // Get the current pathname
  const pathname = usePathname();

  // If the pathname doesn't match any link, show a 404 page
  if (!isExistingUrl(pathname) && !getExistingApps().includes(pathname)) {
    notFound();
  }

  return (
    <main className="mt-40 flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 text-center md:text-left">
        <h3 className="text-xl font-extrabold md:text-3xl">
          This page is currently under construction.
        </h3>
        <p className="text-sm md:text-base">
          Here are the current available pages:
        </p>
        <div className="flex items-center gap-2 text-sm">
          <Link
            className="text-xs text-primary underline hover:brightness-75 md:text-base"
            href={"/contacts/customers/"}
          >
            Customer List
          </Link>
          <Link
            className="text-xs text-primary underline hover:brightness-75 md:text-base"
            href={"/contacts/customers/create"}
          >
            Add Customer
          </Link>
        </div>
      </div>
    </main>
  );
}
