import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow as arrowMiddleware,
  autoUpdate,
} from "@floating-ui/react-dom";
import { themeAtom } from "@/atoms/atoms";

function ThemePopover({ isOpened, closePopover, selectTheme, anchorRef }) {
  const currentTheme = useAtomValue(themeAtom);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    open: isOpened,
    placement: "top",
    strategy: "fixed",
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(14),
      flip({ fallbackPlacements: ["bottom"], padding: 12 }),
      shift({ padding: 12 }),
      arrowMiddleware({ element: arrowRef }),
    ],
  });

  useEffect(() => {
    if (anchorRef?.current) {
      refs.setReference(anchorRef.current);
    }
  }, [anchorRef, refs, isOpened]);

  const themesList = [
    { id: "soft", label: "Soft", color: "bg-[#2c3e50]" },
    { id: "warm", label: "Warm", color: "bg-[#a9741e]" },
    { id: "modern", label: "Modern", color: "bg-[#1a237e]" },
  ];

  const isTop = placement.startsWith("top");
  const arrowX = middlewareData.arrow?.x;

  return createPortal(
    <AnimatePresence>
      {isOpened && (
        <>
          {/*Close overlay on outside click */}
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={closePopover}
            aria-hidden="true"
            data-testid="popover-overlay"
          />

          <motion.div
            ref={refs.setFloating}
            initial={{ opacity: 0, scale: 0.9, y: isTop ? 8 : -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: isTop ? 8 : -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={floatingStyles}
            className="z-50 w-64 p-4 rounded-2xl bg-[var(--container-bg)] border border-[var(--select-border)] shadow-2xl"
            role="dialog"
            aria-label="Theme selection"
          >
            <p className="text-sm font-semibold text-[var(--title-primary)] mb-3">
              Theme
            </p>

            <div className="grid grid-cols-4 gap-3 place-items-center">
              {themesList.map((theme) => {
                const isActive = theme.id === currentTheme;

                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => selectTheme(theme.id)}
                    aria-label={`Select ${theme.label} theme`}
                    className="relative flex items-center justify-center p-1 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95 outline-none"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeThemeRing"
                        className="absolute inset-0 rounded-full border-2 border-blue-600 dark:border-blue-400"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    <span
                      className={`w-8 h-8 rounded-full ${theme.color} shadow-sm block shrink-0`}
                    />
                  </button>
                );
              })}
            </div>

            <div
              ref={arrowRef}
              className="absolute w-3 h-3 bg-[var(--container-bg)] border-[var(--select-border)] rotate-45"
              style={{
                left: arrowX != null ? `${arrowX}px` : "",
                [isTop ? "bottom" : "top"]: "-6px",
                borderRightWidth: isTop ? "1px" : 0,
                borderBottomWidth: isTop ? "1px" : 0,
                borderLeftWidth: isTop ? 0 : "1px",
                borderTopWidth: isTop ? 0 : "1px",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default ThemePopover;
