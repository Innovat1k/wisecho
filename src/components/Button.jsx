function Button({ type, label, icon, onClick }) {
  return (
    <div
      className={`flex justify-center gap-2 items-center px-2 py-0.5 rounded cursor-pointer ${
        type === "submit"
          ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
          : "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)]"
      }`}
    >
      {icon}
      <button className={""} type={type} onClick={onClick}>
        <span className="text-white">{label}</span>
      </button>
    </div>
  );
}

export default Button;
