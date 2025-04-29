function Button({ theme, icon, label, type, onClick }) {
  return (
    <div
      className={`flex justify-center gap-2 items-center px-2 py-0.5 rounded cursor-pointer nth-[all]:cursor-pointer ${
        theme === "soft" ? "bg-amber-300" : "bg-lime-400"
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
