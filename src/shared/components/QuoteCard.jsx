import { LuPanelRightOpen } from "react-icons/lu";
import ActionBar from "./ActionBar";
import { AnimatePresence, motion } from "framer-motion";
import { useQuoteManager } from "@/features/quote/hooks/useQuoteManager";
import Quote from "@/features/quote/Quote";

function QuoteCard({ openDetails, isOnMobile }) {
  const { quote, generateQuote, status, changeTag } = useQuoteManager();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="relative w-full max-w-md md:max-w-xl"
    >
      <div className="min-h-[360px] sm:min-h-[420px] flex flex-col justify-between p-6 bg-[var(--container-bg)] border border-[var(--select-border)] rounded-3xl shadow-xl">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl font-bold text-[var(--title-primary)] text-center w-full">
            Wisecho
          </h1>
          {isOnMobile && (
            <button
              aria-label="Open metrics panel"
              className="cursor-pointer hover:scale-110 duration-200 text-[var(--icon-ui-color)] hover:text-[var(--icon-ui-hover)] sm:hidden absolute right-6"
              onClick={openDetails}
            >
              <LuPanelRightOpen size={24} />
            </button>
          )}
        </div>

        <div className="my-auto flex flex-col justify-center items-center py-4 w-full">
          <AnimatePresence mode="wait">
            <Quote key={quote.id || quote.body} quote={quote} status={status} />
          </AnimatePresence>
        </div>
      </div>

      <ActionBar generateQuote={generateQuote} changeTag={changeTag} />
    </motion.div>
  );
}

export default QuoteCard;
