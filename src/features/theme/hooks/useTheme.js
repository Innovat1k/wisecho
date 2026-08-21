import { useAtom } from "jotai";
import { themeAtom } from "@/atoms/atoms";
import { useEffect, useState } from "react";

// Manages theme selection and popover state, syncing theme class to document body
export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const selectTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    isPopoverOpen,
    togglePopover,
    selectTheme,
  };
};
