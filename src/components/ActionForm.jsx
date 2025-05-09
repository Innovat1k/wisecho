import { LuHeart } from "react-icons/lu";
import Button from "./Button";
import { useFavorise } from "../hooks/useFavorise";

function ActionForm({ newQuote }) {
  const { addFavorite } = useFavorise();

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={newQuote}>
      <Button
        icon={<LuHeart className="fill-[var(--favorite-icon)]" />}
        label="Add to favorite"
        onClick={addFavorite}
        type="button"
      />
      <>
        {/* <select name="q_category" id=""></select> */}
        <Button label="New quote" type="submit" />
      </>
    </form>
  );
}

export default ActionForm;
