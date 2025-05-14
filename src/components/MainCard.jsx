import { LuChartBar, LuPalette } from "react-icons/lu";
import ActionForm from "./ActionForm";
import { useGenQuote } from "../hooks/useGenQuote";
import { motion } from "framer-motion";

function MainCard({ openDetails, openThemeMenu }) {
  const { quote, handleNewQuote, status } = useGenQuote();

  return (
    <motion.div
      initial={{ x: 50 }}
      animate={{ x: 0, transition: { type: "tween", duration: 0.1 } }}
      className="w-[85%] mt-12 p-4 bg-[var(--container-bg)] rounded-lg shadow-2xl"
    >
      <div className="flex justify-between items-center mb-10">
        <LuPalette
          className="cursor-pointer text-[var(--icon-primary)] hover:text-[var(--icon-hover)] duration-300 hover:scale-110"
          onClick={openThemeMenu}
          size={25}
        />
        <h2 className="text-lg text-[var(--title-main)]">Wisecho</h2>
        <LuChartBar
          className="cursor-pointer hover:scale-110 duration-200 text-[var(--icon-primary)] hover:text-[var(--icon-hover)]"
          onClick={openDetails}
          size={25}
        />
      </div>

      <div className="text-center">
        <>
          {status.loading ? (
            <p className="my-8 italic text-zinc-600">Loading...</p>
          ) : status.error ? (
            <p>{status.error}</p>
          ) : (
            <p className="text-2xl text-[var(--text-primary)] mb-6 leading-relaxed">
              “ {quote.text} ”
            </p>
          )}
        </>

        <div className="flex justify-around items-center mb-14">
          <span className="text-sm text-gray-400">{quote.theme}</span>
          <span className="text-sm italic text-[var(--text-secondary)]">
            {quote.author}
          </span>
        </div>

        <ActionForm newQuote={handleNewQuote} />
      </div>
    </motion.div>
  );
}

export default MainCard;
