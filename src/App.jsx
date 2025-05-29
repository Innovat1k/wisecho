import ThemeCard from "./features/theme/components/ThemeCard";
import { useTheme } from "./features/theme/hooks/useTheme";
import { usePersistStorage } from "./shared/hooks/usePersistStorage";
import AppLayout from "./shared/components/AppLayout";

function App() {
  const { isThemeCardOpen, toggleThemeCard, themeActions } = useTheme();
  usePersistStorage();

  return (
    <div className="h-[100dvh] flex items-start justify-center sm:justify-between md:items-start sm:p-3 lg:p-6 bg-[var(--bg)] overflow-hidden">
      <ThemeCard isOpened={isThemeCardOpen} themeActions={themeActions} />
      <AppLayout toggleThemeCard={toggleThemeCard} />
    </div>
  );
}

export default App;
