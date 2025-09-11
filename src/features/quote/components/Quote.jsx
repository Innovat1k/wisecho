import { LuServerOff } from "react-icons/lu";
import Loader from "../../../shared/components/Loader";
import { motion } from "framer-motion";

function Quote({ quote, status }) {
  return (
    <>
      {status.isLoading ? (
        <Loader />
      ) : status.hasError ? (
        <div
          className="my-20 flex flex-col items-center gap-2 text-[var(--text-secondary)]"
          role="alert"
        >
          <LuServerOff size={24} className="opacity-60" />
          <p className="text-sm md:text-base">
            Even our wisdom source needs a break. Try again in a few moments.
          </p>
        </div>
      ) : (
        <>
          <motion.blockquote
            key={quote.id || quote.body}
            initial={{ opacity: 0, y: 20, backgroundColor: "var(--bg)" }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: "var(--container-bg)",
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative p-6 md:p-4 rounded-xl bg-[var(--bg-quote)] shadow-sm mb-6"
          >
            <p
              className="text-xl md:text-lg font-medium text-[var(--text-primary)] leading-relaxed"
              data-testid="q-text"
            >
              “ {quote.body} ”
            </p>
          </motion.blockquote>

          <div
            className="mb-14 flex flex-col gap-3 items-center text-[var(--text-secondary)]"
            data-testid="Quote tags"
          >
            {quote.tags?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {quote.tags.map((tag, index) => (
                  <span
                    data-testid={`tag-${index}`}
                    className="px-2 py-1 text-xs md:text-sm bg-[var(--tag-bg)] text-[var(--tag-text)] rounded-full capitalize transition duration-200 hover:scale-105"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <cite
              data-testid="q-author"
              className="text-sm italic text-[var(--text-secondary)] mt-2"
            >
              — {quote.author}
            </cite>
          </div>
        </>
      )}
    </>
  );
}

export default Quote;
