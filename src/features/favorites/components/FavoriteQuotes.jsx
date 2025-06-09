import { LuTrash } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { useFavoriteQuote } from "../hooks/useFavoriteQuote";

function FavoriteQuotes() {
  const { favQuotes, removeFavorite } = useFavoriteQuote();

  return (
    <div className="h-[70%] bg-[var(--fav-bg)] rounded overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--btn-primary-bg)] scrollbar-track-[var(--container)]">
      <h3 className="mt-4 text-[var(--title-secondary)] mb-4">Favorites</h3>
      <div className="flex flex-col gap-4 px-4 duration-200 ease-in pb-4">
        <AnimatePresence mode="sync">
          {favQuotes.length > 0 ? (
            favQuotes.map((quote) => (
              <motion.div
                key={quote.id ?? quote.body}
                whileHover={{ scale: 1.03 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  transition: { duration: 0.35, ease: "easeInOut" },
                }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  bounce: 0,
                  opacity: { duration: 0.2 },
                }}
                className="flex justify-between gap-6 items-center py-2 px-4 rounded bg-[var(--fav-bg)] hover:bg-[var(--fav-hover-bg)] shadow-[var(--fav-shadow)] hover:shadow-lg"
                role="listitem"
              >
                <div
                  className="text-left w-11/12 text-[var(--fav-text-primary)] line-clamp-3"
                  title={quote.body}
                >
                  {quote.body}
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-[var(--icon-delete-color)] hover:text-[var(--icon-delete-hover)] cursor-pointer"
                  type="button"
                  aria-label="Remove favorite quote"
                  onClick={() => removeFavorite(quote)}
                >
                  <LuTrash size={20} />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              key="empty-favorite"
              className="my-8 italic text-[var(--no-favorites-text)]"
              role="alert"
            >
              “ Your favorites list is still waiting for its first quote. ”
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FavoriteQuotes;
