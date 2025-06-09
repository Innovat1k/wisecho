import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-6 mb-16 bg-[var(--bg)]">
      <motion.div
        className="w-14 h-14 rounded-full border-4 border-t-transparent"
        style={{
          borderImage: "linear-gradient(135deg, var(--loader-accent), transparent) 1",
          borderColor: "var(--text-primary)",
          background: "linear-gradient(145deg, var(--bg), var(--container-bg))",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
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
