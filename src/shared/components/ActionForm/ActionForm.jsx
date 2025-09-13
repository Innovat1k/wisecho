import { LuHeart } from "react-icons/lu";
import Button from "../Button/Button";
import { useFavoriteQuote } from "../../../features/favorites/hooks/useFavoriteQuote";
import { primaryTags } from "../../utils/utils";

function ActionForm({ generateQuote, changeTag }) {
  const { addFavorite, favoriteButton } = useFavoriteQuote();

  return (
    <form className="grid gap-4" onSubmit={generateQuote}>
      <Button
        icon={
          favoriteButton.isInFav ? (
            <LuHeart className="text-[var(--icon-fav-active)] fill-[var(--favorite-icon)] hover:text-[var(--icon-fav-active-hover)]" />
          ) : (
            <LuHeart className="text-[var(--icon-fav-color)] hover:text-[var(--icon-fav-hover)]" />
          )
        }
        label={favoriteButton.label}
        onClick={addFavorite}
        type="button"
        disabled={favoriteButton.isInFav}
        ariaLabel="Add to favorite"
      />
      <div className="grid grid-cols-2 gap-4">
        <select
          className="capitalize hover:cursor-pointer text-center bg-[var(--select-bg)] hover:bg-[var(--select-bg-hover)] text-[var(--select-text)] border border-[var(--select-border)] focus:border-[var(--select-border-focus)] duration-300 rounded"
          name="quote_tag"
          onChange={(e) => changeTag(e)}
          data-testid="tag-selector"
        >
          {primaryTags.map((tag) => (
            <option
              key={tag}
              className="[&:selected]:bg-[var(--select-option-selected-bg)] [&:selected]:text-[var(--select-option-selected-text)]"
            >
              {tag}
            </option>
          ))}
        </select>
        <Button
          label="New quote"
          type="submit"
          ariaLabel="Generate new quote"
        />
      </div>
    </form>
  );
}

export default ActionForm;
