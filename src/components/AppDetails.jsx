import { useAtomValue } from "jotai";
import { FiChevronRight } from "react-icons/fi";
import { favQuotes } from "../atoms/atoms";
import { useFavorise } from "../hooks/useFavorise";
import { motion } from "framer-motion";
import { LuTrash } from "react-icons/lu";

// This component displays the details of the app, including generated quotes and favorites.
// It receives a prop `closeDetails` to handle the closing of the details view.
function AppDetails({ closeDetails }) {
  const favoritesQuotes = useAtomValue(favQuotes);
  const { removeFavorite } = useFavorise();

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
        <FiChevronRight
          className="cursor-pointer hover:scale-110 duration-200 ease-in"
          onClick={closeDetails}
          size={25}
        />
        <h2 className="font-bold w-11/12 text-lg text-[var(--title-main)]">
          App Details
        </h2>
      </div>

      <div className="flex justify-evenly gap-2 mb-6">
        <div className="bg-[var(--th-btn-hover)] p-1 w-1/2 rounded">
          <h3 className="bg-[var(--stat-block-bg)]. border-[var(--stat-block-border)] text-[var(--stat-title-text)] font-semibold">
            Generated quotes
          </h3>
          <p className="text-[var(--stat-number-text)]">06</p>
        </div>
        <div className="bg-[var(--th-btn-hover)] p-1 w-1/2 rounded">
          <h3 className="text-[var(--stat-title-text)] font-semibold">
            Favorites
          </h3>
          <p className="text-[var(--stat-number-text)]">
            {favoritesQuotes.length}
          </p>
        </div>
      </div>

      <div className="h-[70%] bg-[var(--bg)] rounded overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--btn-primary-bg)] scrollbar-track-[var(--container)]">
        <h3 className="mt-4 text-[var(--subtitle)]">Favorites</h3>
        <div className="flex flex-col gap-4 list-disc list-inside px-6 duration-200 ease-in">
          {favoritesQuotes.length >= 1 ? (
            favoritesQuotes.map((quote, index) => (
              <div
                className="flex justify-between gap-6. items-center p-2 shadow hover:shadow-lg rounded"
                key={index}
              >
                <li className="text-left w-11/12">{quote.text}</li>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  type="button"
                  onClick={() => removeFavorite(quote)}
                >
                  <LuTrash />
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
