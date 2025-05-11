import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[var(--bg)]">
      <motion.div
        className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full"
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
