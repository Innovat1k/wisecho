import { useAtomValue } from "jotai";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { favQuotes } from "../atoms/atoms";
import { useFavorise } from "../hooks/useFavorise";

// This component displays the details of the app, including generated quotes and favorites.
// It receives a prop `closeDetails` to handle the closing of the details view.
function AppDetails({ closeDetails }) {
  const favoritesQuotes = useAtomValue(favQuotes);
  const { removeFavorite } = useFavorise();

  return (
    <div className="w-[90%] h-[70%] mt-12 p-4 bg-slate-50 rounded text-center overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <FiChevronRight
          className="cursor-pointer hover:scale-110 duration-300 ease-in w-1/12"
          onClick={closeDetails}
          size={25}
        />
        <h2 className="font-bold text-center text-lg w-11/12">App Details</h2>
      </div>

      <div className="flex justify-evenly">
        <div>
          <h3>Generated quotes</h3>
          <p>06</p>
        </div>
        <div>
          <h3>Favorites</h3>
          <p>{favoritesQuotes.length}</p>
        </div>
      </div>

      <div className="h-[70%] overflow-y-scroll mt-4">
        <h3 className="mt-4.">Favorites</h3>
        <div className="list-disc list-inside mt-2.">
          {favoritesQuotes.length >= 1 ? (
            favoritesQuotes.map((quote, index) => (
              <div className="border-b p-2 mb-2" key={index}>
                <li className="text-left">{quote.text}</li>
                <button className="text-flame-red text-sm" type="button" onClick={() => removeFavorite(quote)}>Delete</button>
              </div>
            ))
          ) : (
            <p className="my-8 italic text-zinc-600">No favorites yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppDetails;
