import AppDetails from "./components/AppDetails";
import MainCard from "./components/MainCard";
import { useShowDetails } from "./hooks/useShowDetails";
import { useResponsive } from "./hooks/useResponsive";
import ThemeCard from "./components/ThemeCard";
import { useTheme } from "./hooks/useTheme";
import { AnimatePresence } from "framer-motion";

function App() {
  const screen = useResponsive();
  const { showDetails, handleShowDetails } = useShowDetails();
  const { isModalOpen, toggleThemeCard, themeActions } = useTheme();

  return (
    <div className="h-[100dvh] flex items-start justify-center md:items-center bg-[var(--bg)] overflow-hidden">
      <ThemeCard isOpened={isModalOpen} themeActions={themeActions} />

      {screen.isMobile ? (
        <>
          <AnimatePresence mode="wait">
            {!showDetails ? (
              <MainCard
                key={"main-card"}
                openDetails={handleShowDetails}
                openThemeMenu={toggleThemeCard}
              />
            ) : (
              <AppDetails
                key={"app-details"}
                closeDetails={handleShowDetails}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <MainCard />
          <AppDetails />
        </>
      )}
    </div>
  );
}

export default App;
