import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuTrash2, LuTag, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useResponsive } from "@/shared/hooks/useResponsive";

export function FavoriteQuoteItem({ quote, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile, isReady } = useResponsive();

  const quoteId = quote.id ?? quote.body;
  const author = quote.author || "Unknown";

  const tags = Array.isArray(quote.tags)
    ? quote.tags
    : typeof quote.tags === "string" && quote.tags.trim() !== ""
      ? quote.tags.split(",").map((t) => t.trim())
      : [];

  const isMobileLayout = isReady && isMobile;

  return (
    <motion.div
      key={quoteId}
      data-testid={`favorite-quote-${quoteId}`}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      className={`group relative flex flex-col justify-between p-3.5 rounded-xl border transition-all duration-200 ${
        isExpanded && isMobileLayout
          ? "bg-[var(--fav-bg)] border-[var(--accent)] shadow-md ring-1 ring-[var(--accent)]/20"
          : "bg-[var(--fav-bg)]/40 hover:bg-[var(--fav-bg)] border-[var(--select-border)] hover:border-[var(--accent)]/50 hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {!isMobileLayout && (
        <button
          type="button"
          aria-label={`Remove quote: "${quote.body.slice(0, 25)}..." by ${author}`}
          onClick={() => onRemove(quote)}
          className="absolute top-3 right-3 p-1.5 rounded-xl text-[var(--icon-delete-color)] opacity-0 group-hover:opacity-100 hover:text-[var(--icon-delete-hover)] hover:bg-red-500/10 active:scale-90 transition-all cursor-pointer outline-none z-10"
        >
          <LuTrash2 size={15} />
        </button>
      )}

      <div
        className="w-full min-w-0 cursor-pointer md:cursor-default"
        onClick={() => isMobileLayout && setIsExpanded(!isExpanded)}
      >
        <p
          className={`text-xs sm:text-sm leading-relaxed text-[var(--fav-text-primary)] font-medium break-words ${
            !isExpanded ? "line-clamp-2" : ""
          } ${!isMobileLayout ? "group-hover:pr-7" : ""}`}
          title={quote.body}
        >
          “{quote.body}”
        </p>
      </div>

      {isMobileLayout && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-end mt-1 py-1 px-1.5 -mr-1 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center gap-1 cursor-pointer outline-none active:scale-95"
        >
          {isExpanded ? <LuChevronUp size={14} /> : <LuChevronDown size={14} />}
        </button>
      )}

      <AnimatePresence>
        {(isExpanded || !isMobileLayout) && (
          <div
            className={`flex items-center justify-between gap-2 min-w-0 ${
              isMobileLayout
                ? "pt-2.5 mt-1 border-t border-[var(--select-border)]/40"
                : "max-h-0 opacity-0 overflow-hidden group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-2.5 group-hover:pt-2.5 group-hover:border-t group-hover:border-[var(--select-border)]/50 transition-all duration-200"
            }`}
          >
            <div className="flex items-center gap-1 min-w-0 overflow-hidden">
              {tags.map((tag, index) => (
                <span
                  key={`${quoteId}-tag-${index}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--tag-bg)] border border-[var(--select-border)] text-[10px] sm:text-xs font-medium text-[var(--tag-text)] tracking-tight max-w-[110px] truncate shrink-0"
                >
                  <LuTag size={10} className="shrink-0 opacity-70" />
                  <span className="truncate">{tag}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0 min-w-0 ml-auto">
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)] truncate max-w-[130px]">
                — {author}
              </span>

              {isMobileLayout && (
                <button
                  type="button"
                  aria-label={`Remove quote: "${quote.body.slice(0, 25)}..." by ${author}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(quote);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-red-500 bg-red-500/10 active:scale-95 text-xs font-semibold transition-all cursor-pointer outline-none shrink-0"
                >
                  <LuTrash2 size={13} />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
