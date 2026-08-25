import Loader from "../ui/Loader";
import QuoteCard from "../QuoteCard";
import MetricsPanel from "../MetricsPanel";
import { useShowDetails } from "@/shared/hooks/useShowDetails";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { AnimatePresence } from "framer-motion";

function QuoteLayout() {
  const screen = useResponsive();
  const { showDetails, handleShowDetails } = useShowDetails();

  if (!screen.isReady) return <Loader />;

  return (
    <main className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-start md:justify-center gap-6 lg:gap-10 pt-6 md:pt-0">
      {screen.isMobile ? (
        <AnimatePresence mode="wait">
          {!showDetails ? (
            <QuoteCard
              key="quote-card"
              openDetails={handleShowDetails}
              isOnMobile={screen.isMobile}
            />
          ) : (
            <MetricsPanel
              key="metrics-panel"
              closePanel={handleShowDetails}
              isOnMobile={screen.isMobile}
            />
          )}
        </AnimatePresence>
      ) : (
        <>
          <QuoteCard />
          <MetricsPanel />
        </>
      )}
    </main>
  );
}

export default QuoteLayout;
