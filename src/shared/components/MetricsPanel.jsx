import { LuChevronRight } from "react-icons/lu";
import { motion } from "framer-motion";
import FavoriteQuotes from "@/features/favorites/FavoriteQuotes";
import { usePersistStorage } from "../hooks/usePersistStorage";
import { MetricsFooter } from "@/features/metrics/MetricsFooter";

function MetricsPanel({ closePanel, isOnMobile }) {
  const { resetAppState } = usePersistStorage();

  const eyebrowStyle =
    "text-[11px] font-bold uppercase tracking-wider text-[var(--title-secondary)]";

  const motionProps = isOnMobile
    ? {
        initial: { x: 40, opacity: 0 },
        animate: {
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 260, damping: 24 },
        },
        exit: { x: 40, opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { x: 40, opacity: 0 },
        animate: {
          x: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 260, damping: 20 },
        },
        exit: { x: 40, opacity: 0, transition: { duration: 0.15 } },
      };

  return (
    <motion.div
      {...motionProps}
      className="w-full h-[90dvh] md:h-[calc(100vh-5rem)] md:w-80 lg:w-96 flex flex-col p-5 bg-[var(--container-bg)] rounded-2xl text-left shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-8 md:gap-0 md:justify-center mb-4 shrink-0">
        {isOnMobile && (
          <button
            type="button"
            aria-label="Close metrics panel"
            className="p-1.5 rounded-xl bg-[var(--bg)] border border-[var(--select-border)] text-[var(--icon-ui-color)] hover:text-[var(--icon-ui-hover)] transition-all cursor-pointer"
            onClick={closePanel}
          >
            <LuChevronRight size={18} />
          </button>
        )}

        <h2 className="text-lg font-bold text-[var(--title-primary)]">
          Analytics & Favorites
        </h2>
      </div>

      <div className="flex-1 min-h-0 flex flex-col mb-4">
        <FavoriteQuotes eyebrowStyle={eyebrowStyle} />
      </div>

      <MetricsFooter eyebrowStyle={eyebrowStyle} onReset={resetAppState} />
    </motion.div>
  );
}

export default MetricsPanel;
