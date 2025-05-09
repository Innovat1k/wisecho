function Button({ type, label, icon, onClick }) {
  return (
    <button
      className={`flex justify-center gap-2 items-center px-2 py-1 rounded cursor-pointer transition-colors duration-300 hover:shadow ${
        type === "submit"
          ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] active:bg-[var(--btn-primary-active)]"
          : "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] hover:bg-[var(--btn-secondary-hover)] active:bg-[var(--btn-secondary-active)]"
      }`}
      type={type}
      onClick={onClick}
    >
      {icon}
      <span className="text-white">{label}</span>
    </button>
  );
}

export default Button;
