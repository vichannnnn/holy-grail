"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { adClickAction, adImpressionAction } from "./actions";
import { InfoButton } from "./InfoButton";

interface ShowcaseProps {
	imageUrl: string;
	altText: string;
	redirectUrl: string;
}

export function Showcase({ imageUrl, altText, redirectUrl }: ShowcaseProps) {
	const showcaseRef = useRef<HTMLDivElement>(null);

	const handleShowcaseClick = async () => {
		try {
			await adClickAction();
		} finally {
			window.open(redirectUrl, "_blank", "noopener,noreferrer");
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(async (entry) => {
					if (entry.isIntersecting) {
						await adImpressionAction();
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.1,
			},
		);

		if (showcaseRef.current) {
			observer.observe(showcaseRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<>
			{/* biome-ignore lint/a11y/useSemanticElements: Cannot use button element due to nested InfoButton component */}
			<div
				role="button"
				tabIndex={0}
				className="w-3/4 md:w-1/3 mx-auto cursor-pointer relative mt-4"
				ref={showcaseRef}
				onClick={handleShowcaseClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleShowcaseClick();
					}
				}}
			>
				<Image alt={altText} src={imageUrl} width={500} height={250} className="w-full h-auto" />
				<InfoButton />
			</div>
		</>
	);
}
