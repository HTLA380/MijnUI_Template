"use client"

import { notFound, usePathname } from "next/navigation"
import UnavailablePage from "@/components/common/unavailable-page"
import { AVAILABLE_PAGES } from "@/_constants/AVAILABLE_PAGES"
import { getExistingApps } from "@/_constants/PAGES"
import { isExistingUrl } from "@/_constants/SIDEBAR_DATA"

export default function UnderConstruction() {
  // Get the current pathname
  const pathname = usePathname()

  // If the pathname doesn't match any link, show a 404 page
  if (!isExistingUrl(pathname) && !getExistingApps().includes(pathname)) {
    notFound()
  }

  return (
    <div className="mt-40 flex w-full items-center justify-center">
      <UnavailablePage currentAvailablePages={AVAILABLE_PAGES} />
    </div>
  )
}
