import { useAtomValue } from "jotai";
import { statisticAtom } from "../atoms/atoms";
import { formatNumber } from "../utils/utils";

function QuoteStatistic() {
  const { generated, favorite } = useAtomValue(statisticAtom);

  return (
    <div className="flex justify-evenly gap-2 mb-6">
      <div className="bg-[var(--th-btn-hover)] p-1 w-1/2 rounded">
        <h3 className="bg-[var(--stat-block-bg)]. border-[var(--stat-block-border)] text-[var(--stat-title-text)] font-semibold">
          Generated quotes
        </h3>
        <p className="text-[var(--stat-number-text)]">
          {formatNumber(generated)}
        </p>
      </div>
      <div className="bg-[var(--th-btn-hover)] p-1 w-1/2 rounded">
        <h3 className="text-[var(--stat-title-text)] font-semibold">
          Favorites
        </h3>

        <p
          className="text-[var(--stat-number-text)]"
          initial={{ opacity: 0, y: 20 }}
        >
          {formatNumber(favorite)}
        </p>
      </div>
    </div>
  );
}

export default QuoteStatistic;
