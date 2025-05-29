import { LuChartBar, LuNetwork, LuPalette, LuWifiOff } from "react-icons/lu";
import ActionForm from "./ActionForm";
import { motion } from "framer-motion";
import { useQuoteManager } from "../../features/quote/hooks/useQuoteManager";
import Quote from "../../features/quote/components/Quote";

function MainCard({ openDetails, openThemeMenu }) {
  const { quote, generateQuote, status, changeTag } = useQuoteManager();

  return (
    <motion.div
      initial={{ x: 50 }}
      animate={{ x: 0, transition: { type: "tween", duration: 0.1 } }}
      className="w-[85%] sm:w-[50%] md:w-[40%] mt-12 p-4 bg-[var(--container-bg)] rounded-lg shadow-2xl"
    >
      <div className="flex justify-between items-center mb-10">
        <LuPalette
          className="cursor-pointer text-[var(--icon-primary)] hover:text-[var(--icon-hover)] duration-300 hover:scale-110"
          onClick={openThemeMenu}
          size={25}
        />
        <h2 className="text-lg text-[var(--title-main)] sm:text-center sm:w-11/12">
          Wisecho
        </h2>
        <LuChartBar
          className="cursor-pointer hover:scale-110 duration-200 text-[var(--icon-primary)] hover:text-[var(--icon-hover)] sm:hidden"
          onClick={openDetails}
          size={25}
        />
      </div>

      <div className="text-center">
        <Quote quote={quote} status={status} />
        <ActionForm newQuote={generateQuote} changeTag={changeTag} />
      </div>
    </motion.div>
  );
}

export default MainCard;
