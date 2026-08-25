import { ResetDataBtn } from "@/features/metrics/ResetDataBtn";
import QuoteMetrics from "./QuoteMetrics";

export function MetricsFooter({ eyebrowStyle, onReset }) {
  return (
    <div className="pt-3 border-t border-[var(--select-border)] shrink-0 flex flex-col gap-2">
      <QuoteMetrics eyebrowStyle={eyebrowStyle} />
      <ResetDataBtn eyebrowStyle={eyebrowStyle} onReset={onReset} />
    </div>
  );
}
