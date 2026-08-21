import { useRef } from "react";
import {
  LuHeart,
  LuChevronDown,
  LuPalette,
  LuSparkles,
  LuArrowRight,
} from "react-icons/lu";
import { useFavoriteQuote } from "@/features/favorites/hooks/useFavoriteQuote";
import { primaryTags } from "../utils/utils";
import { useTheme } from "@/features/theme/hooks/useTheme";
import ThemePopover from "@/features/theme/ThemePopover";
import Button from "./ui/Button";

function ActionBar({ generateQuote, changeTag }) {
  const { addFavorite, favoriteButton } = useFavoriteQuote();
  const { isPopoverOpen, togglePopover, selectTheme } = useTheme();
  const themeButtonRef = useRef(null);

  const tileBaseStyle =
    "shrink-0 rounded-xl bg-white dark:bg-white/5 shadow-sm transition-all duration-200";
  const interactiveTileStyle = `${tileBaseStyle} hover:bg-gray-50 dark:hover:bg-white/10 hover:scale-105 active:scale-95 cursor-pointer`;

  return (
    <form
      onSubmit={generateQuote}
      className="static mt-6 w-full md:absolute md:mt-0 md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 z-40 md:w-max md:max-w-none"
    >
      <div className="rounded-2xl bg-[var(--container-bg)] border border-[var(--select-border)] shadow-xl overflow-hidden">
        <div className="flex items-center justify-between md:justify-center gap-1.5 p-2 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Favorite */}
          <button
            type="button"
            onClick={addFavorite}
            disabled={favoriteButton.isInFav}
            aria-label="Add to favorite"
            className={`p-2.5 ${interactiveTileStyle} disabled:opacity-50 disabled:pointer-events-none`}
          >
            {favoriteButton.isInFav ? (
              <LuHeart className="w-5 h-5 text-[var(--icon-fav-active)] fill-[var(--favorite-icon)]" />
            ) : (
              <LuHeart className="w-5 h-5 text-[var(--icon-fav-color)] hover:text-[var(--icon-fav-hover)]" />
            )}
          </button>

          <div
            className="hidden md:block h-5 w-[1px] bg-[var(--select-border)] shrink-0 mx-1"
            aria-hidden="true"
          />

          {/* Theme */}
          <button
            ref={themeButtonRef}
            type="button"
            aria-label="Open theme menu"
            onClick={togglePopover}
            className={`p-2.5 ${interactiveTileStyle}`}
          >
            <LuPalette className="w-5 h-5 text-[var(--icon-ui-color)] hover:text-[var(--icon-ui-hover)]" />
          </button>

          <ThemePopover
            isOpened={isPopoverOpen}
            selectTheme={selectTheme}
            closePopover={togglePopover}
            anchorRef={themeButtonRef}
          />

          <div
            className="hidden md:block h-5 w-[1px] bg-[var(--select-border)] shrink-0 mx-1"
            aria-hidden="true"
          />

          {/* Tag Select */}
          <div className={`relative inline-flex items-center ${tileBaseStyle}`}>
            <select
              aria-label="Filter quotes by tag"
              className="appearance-none capitalize cursor-pointer bg-transparent text-[var(--select-text)] transition-all duration-200 rounded-xl pl-3 pr-8 py-2.5 text-sm font-medium outline-none truncate max-w-[90px] md:max-w-[130px]"
              name="quote_tag"
              onChange={changeTag}
              data-testid="tag-selector"
            >
              {primaryTags.map((tag) => (
                <option
                  key={tag}
                  value={tag}
                  className="py-1 bg-[var(--container-bg)] text-[var(--select-text)]"
                >
                  {tag}
                </option>
              ))}
            </select>
            <LuChevronDown
              className="w-4 h-4 absolute right-2.5 pointer-events-none text-[var(--select-text)] opacity-60"
              aria-hidden="true"
            />
          </div>

          {/* Generate Button */}
          <Button
            type="submit"
            variant="primary"
            ariaLabel="Generate new quote"
          >
            <span className="hidden md:inline">New quote</span>
            <LuSparkles className="w-4 h-4 md:hidden" />
            <LuArrowRight className="hidden md:block w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ActionBar;
