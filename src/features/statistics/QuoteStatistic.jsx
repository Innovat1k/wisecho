import { useAtomValue } from "jotai";
import { motion } from "framer-motion";
import { statisticAtom } from "../../shared/atoms/atoms";
import { formatNumber } from "../../shared/utils/utils";

function QuoteStatistic() {
  const { generatedCount, favoritesCount } = useAtomValue(statisticAtom);

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex justify-evenly gap-2 mb-6">
      {[
        {
          title: "Generated quotes",
          count: generatedCount,
          id: "generated count",
        },
        {
          title: "Favorite quotes",
          count: favoritesCount,
          id: "favorites count",
        },
      ].map((item, index) => (
        <motion.div
          key={item.title}
          custom={index}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-[var(--stat-bg)]/50 p-2 w-1/2 rounded shadow-[var(--stat-shadow)]"
          data-testid={item.id}
        >
          <h3 className="text-[var(--stat-title)] font-semibold text-sm sm:text-base">
            {item.title}
          </h3>
          <p className="text-[var(--stat-number)] text-lg sm:text-xl font-bold">
            {formatNumber(item.count)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default QuoteStatistic;
