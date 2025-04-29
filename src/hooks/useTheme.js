import { useAtom } from "jotai";
import { appTheme } from "../atoms/atoms";

export const useTheme = () => {
  const [theme, setTheme] = useAtom(appTheme); // Default theme is soft

  // Function to toggle the theme
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return { theme, changeTheme };
};
