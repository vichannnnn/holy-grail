"use client";
import dynamic from "next/dynamic";

// Export a client-side-only CountUp to avoid using client hooks inside server components.
// We keep the export name `CountUp` so existing imports/usage don't need renaming.
export const CountUp = dynamic(() => import("react-countup"), { ssr: false });
