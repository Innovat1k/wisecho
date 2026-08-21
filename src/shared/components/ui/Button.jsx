import { motion } from "framer-motion";

function Button({
  type = "button",
  label,
  icon,
  onClick,
  disabled = false,
  ariaLabel,
  variant = "secondary",
  className = "",
  children,
}) {
  const isSubmit = type === "submit";

  //Unified base styles for all buttons
  const baseStyles =
    "flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer";

  //Style variants
  const variantStyles = {
    primary:
      "bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg-hover)] text-[var(--btn-primary-text)] hover:text-[var(--btn-primary-text-hover)] shadow-sm",
    secondary:
      "bg-[var(--btn-secondary-bg)] hover:bg-[var(--btn-secondary-bg-hover)] text-[var(--btn-secondary-text)] hover:text-[var(--btn-secondary-text-hover)]",
    ghost:
      "bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-[var(--icon-ui-color)] hover:text-[var(--icon-ui-hover)]",
  };

  const selectedVariant =
    variantStyles[variant] ||
    (isSubmit ? variantStyles.primary : variantStyles.secondary);

  const combinedClassName =
    `${baseStyles} ${selectedVariant} ${className}`.trim();
  const computedAriaLabel =
    ariaLabel || (typeof label === "string" ? label : undefined);

  return (
    <motion.button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.03 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      aria-label={computedAriaLabel}
    >
      {children ? (
        children
      ) : (
        <>
          {icon && (
            <span className="flex items-center justify-center shrink-0">
              {icon}
            </span>
          )}
          {label && <span>{label}</span>}
        </>
      )}
    </motion.button>
  );
}

export default Button;
