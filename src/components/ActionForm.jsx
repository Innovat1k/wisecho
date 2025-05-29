import { LuHeart } from "react-icons/lu";
import Button from "./Button";
import { useFavoriteQuote } from "../hooks/useFavoriteQuote";
import { primaryTags } from "../utils/utils";

function ActionForm({ newQuote, changeTag }) {
  const { addFavorite, favoriteButton } = useFavoriteQuote();

  return (
    <form className="grid md:flex md:justify-between md:items-center md:px-6 gap-4" onSubmit={newQuote}>
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
      <div className="grid grid-cols-2 gap-4 md:w-1/2">
        <select
          className="capitalize hover:cursor-pointer text-center text-[var(--text-secondary)] shadow hover:shadow-lg duration-300"
          name="quote_tag"
          id=""
          onChange={(e) => changeTag(e)}
        >
          {primaryTags.map((tag) => (
            <option className="bg-[var(--container-bg)]" key={tag}>
              {tag}
            </option>
          ))}
        </select>
        <Button
          disabled={favoriteButton.isInFav}
          label="New quote"
          type="submit"
        />
      </div>
    </form>
  );
}

export default ActionForm;
