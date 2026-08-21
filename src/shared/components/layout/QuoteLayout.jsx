import Loader from "../ui/Loader";
import QuoteCard from "../QuoteCard";
import AppDetails from "../AppDetails";
import { useShowDetails } from "@/shared/hooks/useShowDetails";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { AnimatePresence } from "framer-motion";

function QuoteLayout() {
  const screen = useResponsive();
  const { showDetails, handleShowDetails } = useShowDetails();

  if (!screen.isReady) return <Loader />;

  return (
    <main className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-start md:justify-center gap-6 lg:gap-10 pt-6 md:pt-0">
      {screen.isMobile ? (
        <AnimatePresence mode="wait">
          {!showDetails ? (
            <QuoteCard
              key="main-card"
              openDetails={handleShowDetails}
              isOnMobile={screen.isMobile}
            />
          ) : (
            <AppDetails
              key="app-details"
              closeDetails={handleShowDetails}
              isOnMobile={screen.isMobile}
            />
          )}
        </AnimatePresence>
      ) : (
        <>
          <QuoteCard />
          <AppDetails />
        </>
      )}
    </main>
  );
}

export default QuoteLayout;
