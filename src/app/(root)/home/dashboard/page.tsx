import React from "react"
import UnavailablePage from "@/components/common/unavailable-page"
import { AVAILABLE_PAGES } from "@/_constants/AVAILABLE_PAGES"

const Home = () => {
  return (
    <div className="mt-40 flex w-full items-center justify-center">
      <UnavailablePage currentAvailablePages={AVAILABLE_PAGES} />
    </div>
  )
}

export default Home
