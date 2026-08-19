import { useAtom } from "jotai";
import { themeAtom } from "@/atoms/atoms";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [themeState, setThemeState] = useState({
    current: "",
    selected: theme,
  });
  const [isThemeCardOpen, setIsThemeCardOpen] = useState(false);

  // Effect to apply the theme class to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Function to choose & preview theme
  const previewTheme = (newTheme) => {
    setThemeState({
      ...themeState,
      current: theme,
      selected: newTheme,
    });
    setTheme(newTheme);
  };

  // Function to open/close the theme card
  const toggleThemeCard = () => {
    setIsThemeCardOpen(!isThemeCardOpen);
  };

  // Function to cancel theme change
  const cancelThemeChange = (e) => {
    e.preventDefault();

    if (themeState.current !== "") {
      setThemeState({
        current: themeState.current,
        selected: "",
      });
      setTheme(themeState.current);
    }

    setIsThemeCardOpen(!isThemeCardOpen);
  };

  // Function to apply theme change
  const applyTheme = (e) => {
    e.preventDefault();
    setTheme(themeState.selected);
    setThemeState({
      current: themeState.selected,
      selected: "",
    });
    setIsThemeCardOpen(!isThemeCardOpen);
  };

  return {
    theme,
    isThemeCardOpen,
    toggleThemeCard,
    themeActions: {
      applyTheme,
      cancelThemeChange,
      previewTheme,
    },
  };
};
