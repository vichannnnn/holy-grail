"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ADS_IMAGE_URL, ADS_ALT_TEXT, ADS_REDIRECT_URL } from "./constants";
import { adClickAction, adImpressionAction } from "./actions";
import { InfoButton } from "./InfoButton";

export function Showcase() {
	const showcaseRef = useRef<HTMLDivElement>(null);

	const handleShowcaseClick = async () => {
		try {
			await adClickAction();
		} finally {
			window.open(ADS_REDIRECT_URL, "_blank", "noopener,noreferrer");
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
		<div
			className="w-3/4 md:w-1/2 mx-auto cursor-pointer relative mt-4"
			ref={showcaseRef}
			onClick={handleShowcaseClick}
		>
			<Image
				alt={ADS_ALT_TEXT}
				src={ADS_IMAGE_URL}
				width={500}
				height={250}
				className="w-full h-auto"
			/>
			<InfoButton />
		</div>
	);
}
