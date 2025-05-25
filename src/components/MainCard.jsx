import { LuChartBar, LuNetwork, LuPalette, LuWifiOff } from "react-icons/lu";
import ActionForm from "./ActionForm";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { useQuoteManager } from "../hooks/useQuoteManager";

function MainCard({ openDetails, openThemeMenu }) {
  const { quote, generateQuote, status } = useQuoteManager();

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
          {status.isLoading ? (
            <Loader />
          ) : status.hasError ? (
            <div className="my-20 flex flex-col items-center gap-2">
              <LuWifiOff size={20} />
              <p className="text-[var(--text-secondary)]">
                Please verify your internet connection.
              </p>
            </div>
          ) : (
            <>
              <p className="text-2xl text-[var(--text-primary)] mb-6 leading-relaxed">
                “ {quote.body} ”
              </p>

              <div className="mb-14 flex flex-col gap-2">
                <div className="flex justify-around items-center">
                  {quote.tags &&
                    quote.tags.map((tag, index) => (
                      <span
                        className="text-sm text-gray-400 capitalize"
                        key={index}
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                <span className="text-sm italic text-[var(--text-secondary)]">
                  {quote.author}
                </span>
              </div>
            </>
          )}
        </>

        <ActionForm newQuote={generateQuote} />
      </div>
    </motion.div>
  );
}

export default MainCard;
