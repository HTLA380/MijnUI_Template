import React from "react"
import Link from "next/link"

type unavailablePageProps = {
  currentAvailablePages: {
    name: string
    url: string
  }[]
}

const UnavailablePage = ({ currentAvailablePages }: unavailablePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center md:text-left">
      <h3 className="text-xl font-extrabold md:text-3xl">
        This page is currently under construction.
      </h3>
      <p className="text-sm md:text-base">
        Here are the current available pages:
      </p>
      <div className="flex items-center gap-2 text-sm">
        {currentAvailablePages.map((page, index) => {
          return (
            <Link
              key={index}
              className="text-xs text-primary underline hover:brightness-75 md:text-base"
              href={page.url}
            >
              {page.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default UnavailablePage
