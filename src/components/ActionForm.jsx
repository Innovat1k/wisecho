import { LuHeart } from "react-icons/lu";
import Button from "./Button";
import { useFavoriteQuote } from "../hooks/useFavoriteQuote";

function ActionForm({ newQuote }) {
  const { addFavorite, favoriteButton } = useFavoriteQuote();

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={newQuote}>
      <Button
        icon={
          favoriteButton.isInFav ? (
            <LuHeart className="text-[var(--favorite-icon)] fill-[var(--favorite-icon)]" />
          ) : (
            <LuHeart className="text-white" />
          )
        }
        label={favoriteButton.label}
        onClick={addFavorite}
        type="button"
      />
      <>
        {/* <select name="q_category" id=""></select> */}
        <Button
          disabled={favoriteButton.isInFav}
          label="New quote"
          type="submit"
        />
      </>
    </form>
  );
}

export default ActionForm;
