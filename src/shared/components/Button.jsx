import { motion } from "framer-motion";

function Button({ type, label, icon, onClick, disabled }) {
  const isSubmit = type === "submit";
  const isFavorite = label === "Favorite";

  const baseStyles =
    "flex justify-center gap-2 items-center px-2 py-1 rounded cursor-pointer transition-colors duration-300 hover:shadow";
  const submitStyles =
    "bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg-hover)]";
  const secondaryStyles =
    "bg-[var(--btn-secondary-bg)] hover:bg-[var(--btn-secondary-bg-hover)]";
  const favStyles =
    "bg-[var(--btn-fav-active-bg)] text-[var(--btn-fav-active-text)]";

  const buttonStyles = `${baseStyles} ${
    isSubmit ? submitStyles : isFavorite ? favStyles : secondaryStyles
  }`;
  const textStyles = isSubmit
    ? "text-[var(--btn-primary-text)] hover:text-[var(--btn-primary-text-hover)]"
    : "text-[var(--btn-secondary-text)] hover:text-[var(--btn-secondary-text-hover)]";

  const isAlreadyFavorite = label === "Favorite" && disabled;

  return (
    <motion.button
      className={buttonStyles}
      disabled={isAlreadyFavorite}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {icon}
      <span className={textStyles}>{label}</span>
    </motion.button>
  );
}

export default Button;
