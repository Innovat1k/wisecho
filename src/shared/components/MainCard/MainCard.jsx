import { LuChartBar, LuPalette } from "react-icons/lu";
import ActionForm from "../ActionForm/ActionForm";
import { motion } from "framer-motion";
import { useQuoteManager } from "../../../features/quote/hooks/useQuoteManager";
import Quote from "../../../features/quote/components/Quote";

function MainCard({ openDetails, openThemeMenu, isOnMobile }) {
  const { quote, generateQuote, status, changeTag } = useQuoteManager();

  return (
    <motion.div
      initial={{ x: 50 }}
      animate={{ x: 0, transition: { type: "tween", duration: 0.1 } }}
      className="w-[85%] max-w-xl sm:w-[50%] md:w-[45%] mt-12 p-4 bg-[var(--container-bg)] rounded-lg shadow-2xl"
    >
      <div className="flex justify-between items-center mb-10">
        <button
          aria-label="Open theme menu"
          onClick={openThemeMenu}
          className="cursor-pointer text-[var(--icon-ui-color)] hover:text-[var(--icon-ui-hover)] duration-300 hover:scale-110"
        >
          <LuPalette size={25} />
        </button>

        <h1 className="text-lg text-[var(--title-primary)] sm:text-center sm:w-11/12">
          Wisecho
        </h1>
        {isOnMobile && (
          <button
            aria-label="Open details"
            className="cursor-pointer hover:scale-110 duration-200 text-[var(--icon-ui-color)] hover:text-[var(--icon-ui-hover)] sm:hidden"
            onClick={openDetails}
          >
            <LuChartBar size={25} />
          </button>
        )}
      </div>

      <div className="text-center">
        <Quote quote={quote} status={status} />
        <ActionForm generateQuote={generateQuote} changeTag={changeTag} />
      </div>
    </motion.div>
  );
}

export default MainCard;
