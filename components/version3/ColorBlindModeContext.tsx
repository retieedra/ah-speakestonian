"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "speakestonian-v3-colorblind-friendly";

type ColorBlindModeContextValue = {
  colorBlindFriendly: boolean;
  setColorBlindFriendly: (value: boolean) => void;
};

const ColorBlindModeContext = createContext<ColorBlindModeContextValue | null>(
  null
);

export function ColorBlindModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorBlindFriendly, setState] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "1" || raw === "true") {
        queueMicrotask(() => setState(true));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setColorBlindFriendly = useCallback((value: boolean) => {
    setState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ colorBlindFriendly, setColorBlindFriendly }),
    [colorBlindFriendly, setColorBlindFriendly]
  );

  return (
    <ColorBlindModeContext.Provider value={value}>
      {children}
    </ColorBlindModeContext.Provider>
  );
}

export function useColorBlindMode(): ColorBlindModeContextValue {
  const ctx = useContext(ColorBlindModeContext);
  if (!ctx) {
    throw new Error("useColorBlindMode must be used within ColorBlindModeProvider");
  }
  return ctx;
}
