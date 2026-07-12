import type Lenis from "lenis";

/** Shared Lenis instance, set by SmoothScroll while active */
export const lenisRef: { current: Lenis | null } = { current: null };

/** Smooth-scroll to an element, through Lenis when active */
export function scrollToElement(el: HTMLElement) {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el, { offset: 0 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) scrollToElement(el);
}
