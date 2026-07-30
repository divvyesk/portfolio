export const OPEN_CHAT = "portfolio:open-chat";
export const OPEN_RESUME = "portfolio:open-resume";
export const NAV_MENU = "portfolio:nav-menu";

/** Opens the AI chat panel, optionally seeding it with a question. */
export function openChat(question) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT, { detail: question ?? null }));
}

export function openResume() {
  window.dispatchEvent(new CustomEvent(OPEN_RESUME));
}

/** Broadcast mobile nav open/closed so overlays (chat FAB, progress bar) can react. */
export function setNavMenuOpen(open) {
  window.dispatchEvent(new CustomEvent(NAV_MENU, { detail: open }));
}
