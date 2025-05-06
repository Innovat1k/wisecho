import { useAtom } from "jotai";
import { appTheme } from "../atoms/atoms";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useAtom(appTheme);
  const [themesChange, setThemesChange] = useState({
    current: "",
    selected: false,
  });
  const [isOpened, setIsOpened] = useState(false);

  // Effect to apply the theme class to the body element
  useEffect(() => {
    document.body.className = theme;
    console.log(document.body.className);
  }, [theme]);

  // Function to toggle the theme
  const changeTheme = (newTheme) => {
    setThemesChange({
      ...themesChange,
      current: newTheme,
      selected: !themesChange.selected,
    });
    setTheme(newTheme);
  };

  // Function to toggle the theme card
  const toggleThemeCard = () => {
    setIsOpened(!isOpened);
  };

  // Function to apply theme change
  const applyChanges = (e) => {
    e.preventDefault();
  };

  return { theme, changeTheme, isOpened, toggleThemeCard };
};
