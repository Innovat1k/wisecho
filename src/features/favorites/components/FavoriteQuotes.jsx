import { LuTrash } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { useFavoriteQuote } from "../hooks/useFavoriteQuote";

function FavoriteQuotes() {
  const { favQuotes, removeFavorite } = useFavoriteQuote();

  return (
    <div className="h-[70%] bg-[var(--bg)] rounded overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--btn-primary-bg)] scrollbar-track-[var(--container)]">
      <h3 className="mt-4 text-[var(--subtitle)] mb-4">Favorites</h3>
      <div className="flex flex-col gap-4 px-4 duration-200 ease-in pb-4">
        <AnimatePresence mode="sync">
          {favQuotes.length >= 1 ? (
            favQuotes.map((quote, id) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  bounce: 0,
                  opacity: { duration: 0.2 },
                }}
                className="flex justify-between gap-6 items-center py-2 px-4 shadow hover:shadow-lg rounded overflow-ellipsis"
                key={id}
              >
                <div className="text-left w-11/12">{quote.body}</div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  type="button"
                  onClick={() => removeFavorite(quote)}
                >
                  <LuTrash />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="empty-favorite"
              className="my-8 italic text-[var(--no-favorites)]"
            >
              No favorites yet
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FavoriteQuotes;
