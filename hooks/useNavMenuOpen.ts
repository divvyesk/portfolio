"use client";

import { useEffect, useState } from "react";
import { NAV_MENU } from "@/lib/events";

/** Tracks whether the mobile/tablet nav overlay is open. */
export function useNavMenuOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => setOpen(Boolean((event as CustomEvent<boolean>).detail));
    window.addEventListener(NAV_MENU, handler);
    return () => window.removeEventListener(NAV_MENU, handler);
  }, []);

  return open;
}
