"use client";

import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

import { Button } from "@/mijn-ui/components/Button";

// =========================================================

const ThemeToggler = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return;

  if (resolvedTheme === "dark") {
    return (
      <Button
        variant={"surface"}
        onClick={() => setTheme("light")}
        className={`size-9 text-muted-text transition duration-200 hover:text-secondary-text sm:size-10 ${className}`}
      >
        <FiSun />
      </Button>
    );
  }
  if (resolvedTheme === "light") {
    return (
      <Button
        variant={"surface"}
        onClick={() => setTheme("dark")}
        className={`size-9 text-muted-text transition duration-200 hover:text-secondary-text sm:size-10 ${className}`}
      >
        <FiMoon />
      </Button>
    );
  }
};

export default ThemeToggler;
