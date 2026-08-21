import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div
      className="flex items-center justify-center gap-1 p-6 h-24"
      data-testid="spinner"
    >
      <motion.span
        animate={{ x: [-4, 0, -4], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        className="text-4xl md:text-5xl leading-none text-[var(--loader-accent)]"
        style={{ fontFamily: "var(--font-voice, serif)" }}
        aria-hidden="true"
      >
        “
      </motion.span>

      <motion.span
        animate={{ x: [4, 0, 4], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        className="text-4xl md:text-5xl leading-none text-[var(--loader-accent)]"
        style={{ fontFamily: "var(--font-voice, serif)" }}
        aria-hidden="true"
      >
        ”
      </motion.span>
    </div>
  );
};

export default Loader;