import { LuX } from "react-icons/lu";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

function ThemeCard({ isOpened, themeActions }) {
  const themesList = ["soft", "warm", "modern"];
  // const themesList = ["🌤 Soft", "🍂 Warm", "🧊 Modern"];
  const { applyTheme, previewTheme, cancelThemeChange } = themeActions;

  return (
    <AnimatePresence>
      {isOpened && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-10 top-0 bg-neutral-800/90 w-full h-[100vh] backdrop-blur-sm"
            key="th-overlay"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="fixed z-20 top-10 w-4/5 bg-[var(--th-bg)] my-auto rounded-lg p-4"
            key="th-select"
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl mb-4 text-[var(--th-title)]">
                Change theme
              </h2>
              <LuX
                aria-label="Close theme menu"
                className="hover:scale-110 text-[var(--th-close-icon)] hover:text-[var(--th-close-icon-hover)] cursor-pointer duration-300"
                onClick={cancelThemeChange}
                size={25}
              />
            </div>

            <div className="flex justify-between items-center mb-6 gap-3">
              {themesList.map((theme, index) => (
                <button
                  aria-label="Preview theme"
                  className="bg-zinc-200 hover:bg-[var(--th-btn-hover)] active:bg-[var(--th-btn-active-bg)] w-1/3 p-1 rounded hover:shadow-sm transition-colors duration-300 cursor-pointer"
                  key={index}
                  onClick={() => previewTheme(theme)}
                >
                  <p>{theme}</p>
                </button>
              ))}
            </div>

            <div className="mb-6 transition-colors bg-neutral-800/90 p-4 rounded">
              <div className="w-50 h-50 bg-[var(--bg)] mx-auto rounded-lg flex flex-col justify-center items-center p-4 gap-2">
                <h3 className="text-sm text-[var(--text-primary)]">Theme</h3>
                <div className="w-3/4 h-2/3 bg-[var(--container-bg)] rounded p-3 flex flex-col justify-center gap-4 items-center">
                  <span className="text-xs text-center text-[var(--text-secondary)]">
                    Modern & professionnal
                  </span>
                  <button className="text-xs py-1 px-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded cursor-pointer">
                    Click here !
                  </button>
                </div>
              </div>
            </div>

            <form
              className="w-1/2. flex grid. grid-cols-2 justify-end gap-4"
              onSubmit={applyTheme}
            >
              <Button
                label="Cancel"
                type="button"
                onClick={cancelThemeChange}
              />
              <Button label="Save" type="submit" />
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ThemeCard;
