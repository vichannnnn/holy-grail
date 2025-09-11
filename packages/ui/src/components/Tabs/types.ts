import type { ReactNode } from "react";

type TabContent = {
	name: string;
	content: ReactNode;
};

export interface TabsProps {
	tabs: TabContent[];
	defaultIndex?: number;
	onChange?: (index: number) => void;
	className?: string;
	tabClassName?: string;
	tabPanelClassName?: string;
	tabListClassName?: string;
}
