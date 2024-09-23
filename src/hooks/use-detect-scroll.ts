import React from "react";

export const useDetectScroll = (navbarHeight: number) => {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > navbarHeight) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    let timeout: NodeJS.Timeout;

    const debouncedHandleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 20);
    };

    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      clearTimeout(timeout);
    };
  }, [navbarHeight]);

  return isActive;
};
