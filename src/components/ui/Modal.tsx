"use client";
import { useEffect, useRef } from "react";
import { useModal } from "./ModalContext";

export const Modal = () => {
  const { isOpen, url, closeModal } = useModal();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") {
        // basic focus trap
        if (!dialogRef.current) return;
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeModal]);

  // Move focus into dialog when opened
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const firstFocusable = dialogRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
      aria-label="Modal dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className="relative w-full max-w-5xl h-[85vh] sm:h-[80vh] flex flex-col rounded-xl bg-white dark:bg-neutral-900 shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sm sm:text-base truncate pr-4"
            >
              {url}
            </a>
          )}
          <button
            onClick={closeModal}
            className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            aria-label="Close modal"
          >
            <span className="text-lg leading-none text-red-600 group-hover:scale-110 transition-transform">
              ×
            </span>
          </button>
        </div>
        <div className="flex-1 relative bg-neutral-100 dark:bg-neutral-800">
          {url ? (
            <iframe
              src={url}
              title={url}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
