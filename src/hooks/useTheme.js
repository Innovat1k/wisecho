import { useAtom } from "jotai";
import { appTheme } from "../atoms/atoms";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useAtom(appTheme);
  const [themeState, setThemeState] = useState({
    current: "",
    selected: theme,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(!isModalOpen);
  };

  // Function to cancel theme change
  const cancelThemeChange = (e) => {
    e.preventDefault();
    setThemeState({
      current: themeState.current,
      selected: "",
    });
    setTheme(themeState.current);
    setIsModalOpen(!isModalOpen);
  };

  // Function to apply theme change
  const applyTheme = (e) => {
    e.preventDefault();
    setTheme(themeState.selected);
    setThemeState({
      current: themeState.selected,
      selected: "",
    });
    setIsModalOpen(!isModalOpen);
    console.log(theme);
  };

  return {
    theme,
    isModalOpen,
    toggleThemeCard,
    themeActions: {
      applyTheme,
      cancelThemeChange,
      previewTheme,
    },
  };
};
