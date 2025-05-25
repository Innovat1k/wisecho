import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-[var(--bg)]. p-6 mb-16">
      <motion.div
        className="w-16. w-12 h-12 h-16. border-4 border-[var(--text-primary)] border-t-transparent rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
