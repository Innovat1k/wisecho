import Loader from "../Loader";
import MainCard from "../MainCard/MainCard";
import AppDetails from "../AppDetails/AppDetails";
import { useShowDetails } from "../../hooks/useShowDetails/useShowDetails";
import { useResponsive } from "../../hooks/useResponsive/useResponsive";
import { AnimatePresence } from "framer-motion";

function AppLayout({ toggleThemeCard }) {
  const screen = useResponsive();
  const { showDetails, handleShowDetails } = useShowDetails();
  if (!screen.isReady) return <Loader />;
  return (
    <>
      {screen.isMobile ? (
        <AnimatePresence mode="wait">
          {!showDetails ? (
            <MainCard
              key={"main-card"}
              openDetails={handleShowDetails}
              openThemeMenu={toggleThemeCard}
              isOnMobile={screen.isMobile}
            />
          ) : (
            <AppDetails
              key={"app-details"}
              closeDetails={handleShowDetails}
              isOnMobile={screen.isMobile}
            />
          )}
        </AnimatePresence>
      ) : (
        <>
          <MainCard openThemeMenu={toggleThemeCard} />
          <AppDetails />
        </>
      )}
    </>
  );
}

export default AppLayout;
