"use client";

import { createContext, use } from "react";
import type { AppId } from "@/content/types";

export type ActiveApp = AppId | "home";

type ShowcaseState = {
  active: ActiveApp;
  setActive: (app: ActiveApp) => void;
};

export const ShowcaseContext = createContext<ShowcaseState | null>(null);

export function useShowcase() {
  const state = use(ShowcaseContext);
  if (!state) throw new Error("useShowcase must be used inside <Showcase>");
  return state;
}
