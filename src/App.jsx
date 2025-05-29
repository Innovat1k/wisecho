import AppDetails from "./components/AppDetails";
import MainCard from "./components/MainCard";
import { useShowDetails } from "./hooks/useShowDetails";
import { useResponsive } from "./hooks/useResponsive";
import ThemeCard from "./components/ThemeCard";
import { useTheme } from "./hooks/useTheme";
import { AnimatePresence } from "framer-motion";
import ResponsiveGuard from "./components/ResponsiveGuard";
import Loader from "./components/Loader";
import { usePersistStorage } from "./hooks/usePersistStorage";

function App() {
  const screen = useResponsive();
  const { showDetails, handleShowDetails } = useShowDetails();
  const { isModalOpen, toggleThemeCard, themeActions } = useTheme();
  usePersistStorage();

  if (!screen.isReady) return <Loader />;

  return (
    <div className="h-[100dvh] flex items-start justify-center sm:justify-between md:items-start sm:p-3 lg:p-6 bg-[var(--bg)] overflow-hidden">
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
          <MainCard openThemeMenu={toggleThemeCard} /> <AppDetails />
        </>
      )}

      {/* {screen.isMobile ? (
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
        <ResponsiveGuard />
      )} */}
    </div>
  );
}

export default App;
