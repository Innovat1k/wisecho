import { useAtomValue } from "jotai";
import { FiChevronRight } from "react-icons/fi";
import { favQuotes } from "../atoms/atoms";
import { useFavorise } from "../hooks/useFavorise";
import { motion, AnimatePresence } from "framer-motion";

// This component displays the details of the app, including generated quotes and favorites.
// It receives a prop `closeDetails` to handle the closing of the details view.
function AppDetails({ closeDetails }) {
  const favoritesQuotes = useAtomValue(favQuotes);
  const { removeFavorite } = useFavorise();

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { type: "tween" } }}
      exit={{ x: 50 }}
      className="w-[90%] h-[70%] mt-12 p-4 bg-[var(--container-bg)] rounded text-center overflow-hidden"
    >
      <div className="flex justify-between items-center mb-5">
        <FiChevronRight
          className="cursor-pointer hover:scale-110 duration-200 ease-in"
          onClick={closeDetails}
          size={25}
        />
        <h2 className="font-bold text-lg w-1/1 text-[var(--title-main)]">
          App Details
        </h2>
      </div>

      <div className="flex justify-evenly">
        <div>
          <h3 className="text-[var(--stat-title-text)] font-semibold">
            Generated quotes
          </h3>
          <p className="text-[var(--stat-number-text)]">06</p>
        </div>
        <div>
          <h3 className="text-[var(--stat-title-text)] font-semibold">
            Favorites
          </h3>
          <p className="text-[var(--stat-number-text)]">
            {favoritesQuotes.length}
          </p>
        </div>
      </div>

      <div className="h-[70%] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--btn-primary-bg)] scrollbar-track-[var(--container)] mt-4">
        <h3 className="mt-4 text-[var(--subtitle)]">Favorites</h3>
        <div className="list-disc list-inside mt-2.">
          {favoritesQuotes.length >= 1 ? (
            favoritesQuotes.map((quote, index) => (
              <div className="border-b p-2 mb-2" key={index}>
                <li className="text-left">{quote.text}</li>
                <button
                  className="text-flame-red text-sm"
                  type="button"
                  onClick={() => removeFavorite(quote)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="my-8 italic text-[var(--no-favorites)]">
              No favorites yet
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default AppDetails;
