import { AnimatePresence, motion } from "framer-motion";
import { useFavoriteQuote } from "./hooks/useFavoriteQuote";
import { FavoriteQuoteItem } from "./FavoriteQuoteItem";

function FavoriteQuotes({ eyebrowStyle }) {
  const { favQuotes, removeFavorite } = useFavoriteQuote();

  return (
    <section
      className="flex flex-col h-full min-h-0"
      aria-labelledby="favorites-title"
    >
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 id="favorites-title" className={eyebrowStyle}>
          Favorites
        </h3>

        {favQuotes.length > 0 && (
          <span
            className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] border border-[var(--select-border)]"
            data-testid="favorites-metric"
          >
            {favQuotes.length}
          </span>
        )}
      </div>

      <div
        className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-2 custom-scrollbar"
        data-testid="favorite-quotes"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {favQuotes.length > 0 ? (
            favQuotes.map((quote) => (
              <FavoriteQuoteItem
                key={quote.id ?? quote.body}
                quote={quote}
                onRemove={removeFavorite}
              />
            ))
          ) : (
            <motion.div
              key="empty-favorite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center p-4 text-center rounded-2xl border border-dashed border-[var(--select-border)]"
            >
              <p className="text-xs text-[var(--no-favorites-text)] italic">
                Your favorites list is still waiting for its first quote.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default FavoriteQuotes;
