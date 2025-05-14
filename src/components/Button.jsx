import { motion } from "framer-motion";

function Button({ type, label, icon, onClick, disabled }) {
  return (
    <motion.button
      className={`flex justify-center gap-2 items-center px-2 py-1 rounded cursor-pointer transition-colors duration-300 hover:shadow ${
        type === "submit"
          ? "bg-[var(--btn-primary-bg)]  hover:bg-[var(--btn-primary-bg-hover)] active:bg-[var(--btn-primary-active)]"
          : ` active:bg-[var(--btn-secondary-active)] ${
              label === "Favorite"
                ? "bg-[var(--btn-secondary-active)] "
                : "bg-[var(--btn-secondary-bg)] hover:bg-[var(--btn-secondary-hover)] "
            }`
      }`}
      disabled={disabled && label === "Favorite"}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      {icon}
      <span
        className={
          type === "submit"
            ? "text-[var(--btn-primary-text)] hover:text-[var(--btn-primary-text-hover)]"
            : "text-[var(--btn-secondary-text)] hover:text-[var(--btn-secondary-text-hover)]"
        }
      >
        {label}
      </span>
    </motion.button>
  );
}

export default Button;
