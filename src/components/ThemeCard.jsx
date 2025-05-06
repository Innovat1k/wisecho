import { FiX } from "react-icons/fi";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

function ThemeCard({ isOpened, closeTMenu, changeTheme }) {
  const themesList = ["soft", "warm", "modern"];

  return (
    <AnimatePresence>
      {isOpened && (
        <>
          <div className="fixed z-10 top-0 bg-slate-900/90 w-full h-[100vh]"></div>
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0, transition: { type: "tween" } }}
            exit={{
              y: -50,
              opacity: 0,
              transition: { type: "tween", duration: 0.1 },
            }}
            className="fixed z-20 top-10 w-4/5 bg-[var(--themecard-bg)] my-auto rounded"
          >
            <div className="p-4 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-center mb-4 text-[var(--themecard-title)]">
                  Change theme
                </h2>
                <FiX
                  className="fill-[var(--themecard-close-icon)]"
                  onClick={closeTMenu}
                  size={25}
                />
              </div>

              <div className="flex justify-between items-center mb-6 gap-3">
                {themesList.map((theme, index) => (
                  <button
                    className="bg-[var(--themecard-btn-bg)] hover:bg-[var(--themecard-btn-hover-bg)] active:bg-[var(--themecard-btn-active-bg)] w-1/3 text-center border p-1 rounded hover:shadow-md transition-colors"
                    key={index}
                    onClick={() => changeTheme(theme)}
                  >
                    <p>{theme}</p>
                  </button>
                ))}
              </div>

              <form className="flex justify-end gap-4" onSubmit={changeTheme}>
                <Button label={"Cancel"} type={"button"} onClick={closeTMenu} />
                <Button label={"Save"} type={"submit"} />
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ThemeCard;
