import { LuChevronRight } from "react-icons/lu";
import { useFavoriteQuote } from "../hooks/useFavoriteQuote";
import { motion } from "framer-motion";
import FavoriteQuotes from "./FavoriteQuotes";

// This component displays the details of the app, including generated quotes and favorites.
// It receives a prop `closeDetails` to handle the closing of the details view.
function AppDetails({ closeDetails }) {
  const { favQuotes, removeFavorite } = useFavoriteQuote();

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
          <p className="text-[var(--stat-number-text)]">{favQuotes.length}</p>
        </div>
      </div>

      <FavoriteQuotes favQuotes={favQuotes} removeFavorite={removeFavorite} />
    </motion.div>
  );
}

export default AppDetails;
