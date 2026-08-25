import { LuTrash2 } from "react-icons/lu";

export function ResetDataBtn({ onReset }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-600 border border-red-500/15 text-xs font-semibold transition-all cursor-pointer outline-none"
    >
      <LuTrash2 size={13} />
      <span>Reset Application Data</span>
    </button>
  );
}
