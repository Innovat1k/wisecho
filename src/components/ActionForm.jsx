import { FiHeart } from "react-icons/fi";
import Button from "./Button";
import { useFavorise } from "../hooks/useFavorise";

function ActionForm({ newQuote }) {
  const { addFavorite } = useFavorise();

  return (
    <form
      className="flex items-center justify-center gap-6"
      onSubmit={newQuote}
    >
      <Button
        icon={<FiHeart className="fill-white" />}
        label={"Add to favorite"}
        onClick={addFavorite}
        type={"button"}
      />
      <>
        <select name="q_category" id=""></select>
        <Button label={"New quote"} type="submit" />
      </>
    </form>
  );
}

export default ActionForm;
