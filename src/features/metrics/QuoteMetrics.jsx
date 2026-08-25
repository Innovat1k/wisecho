import { useAtomValue } from "jotai";
import { statisticAtom } from "@/atoms/atoms";
import { formatNumber } from "@/shared/utils/utils";
import { LuSparkles } from "react-icons/lu";

function QuoteMetrics({ eyebrowStyle }) {
  const { generatedCount } = useAtomValue(statisticAtom);

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[var(--stat-bg)]/30 border border-[var(--select-border)] shadow-xs">
      <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]">
        <LuSparkles size={15} />
      </div>

      <div className="grid grid-cols-3 gap-2 divide-x divide-[var(--select-border)] w-full">
        <div className="flex flex-col min-w-0" data-testid="generated-quotes-metric">
          <span className={`${eyebrowStyle} leading-none text-[10px]`}>
            Generated
          </span>
          <span className="text-xs font-extrabold text-[var(--stat-number)] leading-tight mt-0.5">
            {formatNumber(generatedCount)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuoteMetrics;
