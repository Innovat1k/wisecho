import { FiBarChart2 } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import ActionForm from "./ActionForm";
import { useGenQuote } from "../hooks/useGenQuote";

function MainCard({ openDetails }) {
  const { theme, changeTheme } = useTheme();
  const { quote, handleNewQuote, status } = useGenQuote();

  return (
    <div
      className={`w-[90%] h-[50%] mt-12 p-4 bg-slate-50 rounded text-center ${
        theme === "modern"
          ? "bg-pure-white"
          : theme === "warm"
          ? "bg-warm-sand"
          : ""
      }`}
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-center text-lg w-11/12">Quote Gen</h2>
        <FiBarChart2
          className="cursor-pointer hover:scale-110 duration-300 ease-in w-1/12"
          onClick={openDetails}
          size={25}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={(e) => changeTheme(e.target.innerText)}>soft</button>
        <button onClick={(e) => changeTheme(e.target.innerText)}>warm</button>
        <button onClick={(e) => changeTheme(e.target.innerText)}>modern</button>
      </div>

      <div className="flex. flex-col gap-4">
        {status.loading ? (
          <p className="my-8 italic text-zinc-600">Loading...</p>
        ) : status.error ? (
          <p>{status.error}</p>
        ) : (
          <div>
            <p
              className={`text-2xl ${
                theme === "modern"
                  ? "text-ocean-blue"
                  : theme === "warm"
                  ? "text-earth-brown"
                  : ""
              }`}
            >
              {quote.text}
            </p>
            <span
              className={`text-sm italic ${
                theme === "modern"
                  ? "text-deep-charcoal"
                  : theme === "warm"
                  ? "text-slate-gray"
                  : ""
              }`}
            >
              {quote.author}
            </span>
          </div>
        )}

        <div className="flex justify-center gap-5 mt-4 mb-10">
          {/* {categories.map((elem, index) => (
            <span className="text-sm text-gray-400" key={index}>
              {elem}
            </span>
          ))} */}
          <span className="text-sm text-gray-400">{quote.theme}</span>
        </div>

        <ActionForm newQuote={handleNewQuote} />
      </div>
    </div>
  );
}

export default MainCard;
