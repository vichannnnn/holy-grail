import type { SVGProps } from "react";

export function CustomDownloadIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1} {...props}>
			<title>Download</title>
			<path d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z" />
		</svg>
	);
}
