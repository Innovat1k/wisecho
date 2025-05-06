import { FiBarChart2, FiTool } from "react-icons/fi";
import ActionForm from "./ActionForm";
import { useGenQuote } from "../hooks/useGenQuote";
import { motion } from "framer-motion";

function MainCard({ openDetails, openThemeMenu }) {
  const { quote, handleNewQuote, status } = useGenQuote();

  return (
    <motion.div
      initial={{ x: -50 }}
      animate={{ opacity: 1, x: 0, transition: {type: "tween"} }}
      className={`w-[85%] mt-12 p-4 bg-[var(--container-bg)] rounded text-center `}
    >
      <div className="flex justify-between items-center mb-10">
        <FiTool
          className="cursor-pointer text-[var(--icon-primary)] hover:text-[var(--icon-hover)] duration-200 hover:scale-110"
          onClick={openThemeMenu}
          size={25}
        />
        <h2 className="font-bold text-center text-lg w-11/12 text-[var(--title-main)]">
          Quote Gen
        </h2>
        <FiBarChart2
          className="cursor-pointer hover:scale-110 duration-200 text-[var(--icon-primary)] hover:text-[var(--icon-hover)]"
          onClick={openDetails}
          size={25}
        />
      </div>

      <div className="">
        <>
          {status.loading ? (
            <p className="my-8 italic text-zinc-600">Loading...</p>
          ) : status.error ? (
            <p>{status.error}</p>
          ) : (
            <div className="mb-6">
              <p className={`text-2xl text-[var(--text-primary)] mb-2`}>
                {quote.text}
              </p>
            </div>
          )}
        </>

        <div className="flex justify-between items-center mb-14">
          <span className="text-sm text-gray-400">{quote.theme}</span>
          <span className={`text-sm italic text-[var(--text-secondary)]`}>
            {quote.author}
          </span>
        </div>

        <ActionForm newQuote={handleNewQuote} />
      </div>
    </motion.div>
  );
}

export default MainCard;
