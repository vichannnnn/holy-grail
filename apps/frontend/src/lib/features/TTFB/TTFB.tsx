"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function TTFB() {
	const pathname = usePathname();
	const isFirstRenderRef = useRef(true);

	useEffect(() => {
		// Skip measurement on initial mount
		if (isFirstRenderRef.current) {
			isFirstRenderRef.current = false;
			return;
		}

		const entry = performance.getEntriesByType("navigation").at(-1) as PerformanceNavigationTiming;
		if (entry) {
			const duration = entry.responseStart - entry.requestStart;
			console.info(`[TTFB] ${pathname}: ${duration.toFixed(2)}ms`);
		}
	}, [pathname]);

	return null;
}
