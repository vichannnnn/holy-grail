"use client";
import { useMemo, useState, useEffect } from "react";
import type { Breakpoint, BreakpointState } from "./types";
import { Breakpoints, MOBILE_MEDIA_QUERY } from "./constants";

export function useBreakpoint(): BreakpointState {
	// Create a memoized object of media queries
	const queries = useMemo(() => {
		return Object.entries(Breakpoints).reduce(
			(prev, [breakpoint, size]) => {
				prev[breakpoint as Breakpoint] = `(min-width: ${size}px)`;
				return prev;
			},
			{} as Record<Breakpoint, string>,
		);
	}, []);

	// Initialize the breakpoint state
	const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
		// Find the first breakpoint that matches the current window size
		const indexOfLastQuery = Object.values(queries)
			.map((query) => window.matchMedia(query).matches)
			.lastIndexOf(true);
		return Object.keys(queries)[indexOfLastQuery] as Breakpoint;
	});

	const [isMobile, setIsMobile] = useState<boolean>(() => {
		// Check if the current window size is mobile
		return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
	});

	useEffect(() => {
		// Create a list of media query lists
		const mediaQueryLists = Object.values(queries).map((query) => window.matchMedia(query));

		// Handle window resize events
		const handleResize = () => {
			const indexOfLastQuery = mediaQueryLists.map((mql) => mql.matches).lastIndexOf(true);
			setBreakpoint(Object.keys(queries)[indexOfLastQuery] as Breakpoint);
			setIsMobile(window.matchMedia(MOBILE_MEDIA_QUERY).matches);
		};

		// Add the resize event listener
		window.addEventListener("resize", handleResize);
		// Call the resize handler once to set the initial breakpoint
		handleResize();

		// Remove the resize event listener on cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [queries]);

	return { breakpoint, isMobile };
}
