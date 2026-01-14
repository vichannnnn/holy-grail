export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface BreakpointState {
	breakpoint: Breakpoint;
	isMobile: boolean;
}
