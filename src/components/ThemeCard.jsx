import { LuX } from "react-icons/lu";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

function ThemeCard({ isOpened, closeTMenu, changeTheme }) {
  const themesList = ["soft", "warm", "modern"];

  return (
    <AnimatePresence>
      {isOpened && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-10 top-0 bg-neutral-800/90 w-full h-[100vh]"
            key="th-overlay"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { type: "spring" } }}
            exit={{
              opacity: 0,
              transition: { type: "tween", duration: 0.2 },
            }}
            className="fixed z-20 top-10 w-4/5 bg-[var(--th-bg)] my-auto rounded-lg p-4"
            key="th-select"
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl mb-4 text-[var(--th-title)]">
                Change theme
              </h2>
              <LuX
                className="hover:scale-110 text-[var(--th-close-icon)] hover:text-[var(--th-close-icon-hover)] cursor-pointer duration-300"
                onClick={closeTMenu}
                size={25}
              />
            </div>

            <div className="flex justify-between items-center mb-6 gap-3">
              {themesList.map((theme, index) => (
                <button
                  className="bg-zinc-200 hover:bg-[var(--th-btn-hover)] active:bg-[var(--th-btn-active-bg)] w-1/3 p-1 rounded hover:shadow-sm transition-colors duration-300 cursor-pointer"
                  key={index}
                  onClick={() => changeTheme(theme)}
                >
                  <p>{theme}</p>
                </button>
              ))}
            </div>

            <form
              className="w-1/2. flex grid. grid-cols-2 justify-end gap-4"
              onSubmit={changeTheme}
            >
              <Button label="Cancel" type="button" onClick={closeTMenu} />
              <Button label="Save" type="submit" />
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ThemeCard;
