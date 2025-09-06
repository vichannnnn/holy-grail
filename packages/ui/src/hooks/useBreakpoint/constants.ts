import type { Breakpoint } from "./types";

/**
 * Breakpoints for responsive design, defined in px units.
 * This corresponds with built in Tailwind breakpoints.
 *
 * Each breakpoint corresponds to a minimum width for the viewport.
 * The key is the name of the breakpoint, and the value is the minimum width in em units.
 *
 * @type {Record<Breakpoint, number>}
 */
export const Breakpoints: Record<Breakpoint, number> = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

/**
 * The breakpoint for mobile devices.
 * @type {Breakpoint}
 */
export const MOBILE_BREAKPOINT: Breakpoint = "sm";

/**
 * The media query for mobile devices.
 * Any viewport width less than the mobile breakpoint (sm: 640px) is considered mobile.
 * @type {string}
 */
export const MOBILE_MEDIA_QUERY = `(max-width: ${Breakpoints[MOBILE_BREAKPOINT]}px)`;
