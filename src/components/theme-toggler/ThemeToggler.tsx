"use client";

import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

import { Button } from "../_mijn-ui/Button";

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
        className={`transition duration-200 text-muted-text hover:text-secondary-text ${className}`}
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
        className={`transition duration-200 text-muted-text hover:text-secondary-text ${className}`}
      >
        <FiMoon />
      </Button>
    );
  }
};

export default ThemeToggler;
