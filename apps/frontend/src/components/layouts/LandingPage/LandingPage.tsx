"use client";

import { Analytics } from "@layouts/LandingPage/Analytics";
import { DesktopHero, MobileHero } from "@layouts/LandingPage/Hero";
import { useContext } from "react";

import { MediaQueryContext } from "@providers/MediaQueryProvider";

export const LandingPage = () => {
	const { isMedium } = useContext(MediaQueryContext);

	return (
		<div className="flex flex-col">
			{isMedium ? <DesktopHero /> : <MobileHero />}
			<Analytics />
		</div>
	);
};
