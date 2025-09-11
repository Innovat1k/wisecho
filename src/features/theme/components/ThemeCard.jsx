import { LuX } from "react-icons/lu";
import Button from "../../../shared/components/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { themeAtom } from "../../../shared/atoms/atoms";

function ThemeCard({ isOpened, themeActions }) {
  const themesList = ["soft", "warm", "modern"];
  const currentTheme = useAtomValue(themeAtom);
  const { applyTheme, previewTheme, cancelThemeChange } = themeActions;

  const themeLabels = {
    soft: "Soft & Soothing",
    warm: "Warm & Natural",
    modern: "Modern & Professional",
  };

  const label = themeLabels[currentTheme] || "";

  return (
    <AnimatePresence>
      {isOpened && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-10 inset-0 bg-neutral-800/90 w-full h-[100vh] backdrop-blur"
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
            className="fixed z-20 top-1/2 left-1/2 -translate-1/2 w-4/5 bg-[var(--bg-theme-card)] rounded-lg p-4"
            key="th-select"
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl mb-4 text-[var(--title-theme-card)]">
                Change theme
              </h2>
              <button
                className="hover:scale-110 text-[var(--icon-ui-color)] hover:text-[var(--icon-ui-hover)] cursor-pointer duration-300"
                onClick={cancelThemeChange}
                aria-label="Close theme menu"
              >
                <LuX size={25} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex justify-between items-center sm:flex-col sm:justify-normal sm:w-1/3 mb-6 gap-3">
                {themesList.map((theme, index) => (
                  <motion.button
                    aria-label={`Preview ${theme} theme`}
                    className={`capitalize  hover:bg-[var(--btn-bg-hover-theme-card)]  hover:text-[var(ext-hover-theme-card)] w-1/3 sm:w-full p-1 rounded hover:shadow-sm transition-colors duration-300 cursor-pointer ${
                      theme === currentTheme
                        ? "bg-[var(--btn-active-bg-theme-card)] text-[var(--btn-active-text-theme-card)]"
                        : "bg-[var(--btn-bg-theme-card)] text-[var(--btn-text-theme-card)]"
                    }`}
                    key={index}
                    onClick={() => previewTheme(theme)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p>{theme}</p>
                  </motion.button>
                ))}
              </div>

              <div className="mb-6 bg-neutral-800/90 p-4 rounded sm:w-full transition-transform hover:scale-[1.02]">
                <div className="w-50 sm:w-100 h-50 sm:h-80 bg-[var(--bg)] mx-auto rounded-lg flex flex-col justify-center items-center p-4 gap-2 transition-colors duration-500">
                  <h3 className="text-sm text-[var(--text-primary)]">Theme</h3>
                  <div className="w-3/4 h-2/3 bg-[var(--container-bg)] rounded p-3 flex flex-col justify-center gap-4 items-center transition-colors duration-500">
                    <span className="text-xs text-center text-[var(--text-secondary)] sm:text-lg">
                      {label}
                    </span>
                    <span className="text-xs py-1 px-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded">
                      Previewing...
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <form
              className="grid grid-cols-2 sm:flex sm:justify-end gap-4"
              data-testid="theme-form"
              onSubmit={applyTheme}
            >
              <Button
                label="Cancel"
                type="button"
                onClick={cancelThemeChange}
                ariaLabel="Cancel change"
              />
              <Button
                label="Apply theme"
                type="submit"
                ariaLabel="Apply theme"
              />
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ThemeCard;
