"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ModalState = {
  isOpen: boolean;
  url: string | null;
};

type ModalContextValue = {
  isOpen: boolean;
  url: string | null;
  openModal: (url: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ModalState>({ isOpen: false, url: null });
  const lastFocused = useRef<HTMLElement | null>(null);

  const openModal = useCallback((url: string) => {
    if (!url) return;
    lastFocused.current = (document.activeElement as HTMLElement) || null;
    setState({ isOpen: true, url });
    // Prevent body scroll
    document.documentElement.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setState({ isOpen: false, url: null });
    document.documentElement.style.overflow = "";
    if (lastFocused.current) {
      lastFocused.current.focus();
    }
  }, []);

  return (
    <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
