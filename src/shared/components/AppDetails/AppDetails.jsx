import { LuChevronRight, LuRefreshCw } from "react-icons/lu";
import { motion } from "framer-motion";
import FavoriteQuotes from "../../../features/favorites/components/FavoriteQuotes";
import QuoteStatistic from "../../../features/statistics/QuoteStatistic";
import { usePersistStorage } from "../../hooks/usePersistStorage/usePersistStorage"; 

function AppDetails({ closeDetails, isOnMobile }) {
  const { resetAppState } = usePersistStorage();

  return (
    <motion.div
      initial={{ x: 150, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
      exit={{
        x: 150,
        opacity: 0,
        transition: { duration: 0.15 },
      }}
      className="w-[90%] sm:w-[45%] md:w-[40%] h-[80vh] max-h-[80vh] mt-12 p-4 bg-[var(--container-bg)] rounded-lg text-center overflow-y-auto shadow-2xl"
    >
      <div className="flex justify-between items-center mb-5">
        {isOnMobile && (
          <button
            aria-label="Close details"
            className="cursor-pointer hover:scale-110 duration-200 ease-in sm:hidden text-[var(--icon-ui-color)] hover:text-[var(--icon-ui-hover)]"
            onClick={closeDetails}
          >
            <LuChevronRight size={25} />
          </button>
        )}

        <h2 className="font-bold w-11/12 text-lg text-[var(--title-primary)]">
          App Details
        </h2>
        <button
          aria-label="Clear data"
          className="cursor-pointer hover:scale-110 duration-200 ease-in text-[var(--icon-ui-color)] hover:text-[var(--accent)]"
          onClick={resetAppState}
        >
          <LuRefreshCw size={20} />
        </button>
      </div>

      <p className="text-sm text-[var(--text-secondary)] mb-4">
        Favorite quotes and app usage stats.
      </p>

      <QuoteStatistic />
      <FavoriteQuotes />
    </motion.div>
  );
}

export default AppDetails;
