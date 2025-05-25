import { LuChevronRight, LuRefreshCcwDot, LuRefreshCw } from "react-icons/lu";
import { motion } from "framer-motion";
import FavoriteQuotes from "./FavoriteQuotes";
import QuoteStatistic from "./QuoteStatistic";
import { usePersistStorage } from "../hooks/usePersistStorage";

function AppDetails({ closeDetails }) {
  const { resetAppState } = usePersistStorage();

  return (
    <motion.div
      initial={{ x: 150, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { type: "tween", duration: 0.1 },
      }}
      exit={{
        x: 150,
        opacity: 0,
        transition: { type: "tween", duration: 0.1 },
      }}
      className="w-[90%] h-[80vh] max-h-[80vh] mt-12 p-4 bg-[var(--container-bg)] rounded-lg text-center overflow-hidden shadow-2xl"
    >
      <div className="flex justify-between items-center mb-5">
        <LuChevronRight
          className="cursor-pointer hover:scale-110 duration-200 ease-in"
          onClick={closeDetails}
          size={25}
        />
        <h2 className="font-bold w-11/12 text-lg text-[var(--title-main)]">
          App Details
        </h2>
        <LuRefreshCw
          className="cursor-pointer hover:scale-110 duration-200 ease-in"
          onClick={resetAppState}
          size={25}
        />
      </div>

      <QuoteStatistic />
      <FavoriteQuotes />
    </motion.div>
  );
}

export default AppDetails;
