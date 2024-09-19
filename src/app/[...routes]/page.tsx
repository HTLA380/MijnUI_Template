"use client";

import Link from "next/link";
import { notFound, usePathname } from "next/navigation";

import { isExistingUrl } from "@/_constants/SIDEBAR_DATA";

export default function NotFound() {
  // Get the current pathname
  const pathname = usePathname();

  // If the pathname doesn't match any link, show a 404 page
  if (!isExistingUrl(pathname)) {
    notFound();
  }

  return (
    <main className="w-full mt-40 flex items-center justify-center">
      <div className="flex items-center gap-3 flex-col justify-center">
        <h3 className="text-3xl font-extrabold">This page is currently under construction.</h3>
        <p>Here are the current available pages:</p>
        <div className="flex items-center gap-2 text-sm">
          <Link className="text-blue-500 hover:text-blue-700 underline" href={"/contacts/customers/"}>
            Customer List
          </Link>
          <Link className="text-blue-500 hover:text-blue-700 underline" href={"/contacts/customers/create"}>
            Add Customer
          </Link>
        </div>
      </div>
    </main>
  );
}
