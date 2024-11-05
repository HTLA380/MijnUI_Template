"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@mijn-ui/components/button"
import { useTheme } from "next-themes"
import { FiMoon, FiSun } from "react-icons/fi"

/* -------------------------------------------------------------------------- */

const ThemeToggler = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return

  if (resolvedTheme === "dark") {
    return (
      <Button
        color={"surface"}
        onClick={() => setTheme("light")}
        className={`text-muted-text size-9 transition duration-200 hover:text-secondary-text sm:size-10 ${className}`}
      >
        <FiSun />
      </Button>
    )
  }
  if (resolvedTheme === "light") {
    return (
      <Button
        color={"surface"}
        onClick={() => setTheme("dark")}
        className={`text-muted-text size-9 transition duration-200 hover:text-secondary-text sm:size-10 ${className}`}
      >
        <FiMoon />
      </Button>
    )
  }
}

export default ThemeToggler
