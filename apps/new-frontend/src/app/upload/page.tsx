"use client";
import { Title, Text, FileDrop, type FileDropHandle } from "@shared/ui/components";
import { useRef, useEffect } from "react";

export default function UploadPage() {
	const inputRef = useRef<FileDropHandle>(null);

	// You can access the files via inputRef.current.files
	console.log(inputRef.current?.input?.files);

	return (
		<main className="flex flex-col items-center mx-auto lg:w-2/3 w-5/6 ">
			<div className="flex flex-col items-center gap-2 mb-8">
				<Title order={1} className="font-bold text-center text-2xl">
					Upload Materials
				</Title>
				<Title order={2} className="text-center text-lg font-normal">
					Thanks for contributing to Holy Grail! Note that all uploads will be reviewed by the admin
					team before being published.
				</Title>
			</div>

			<FileDrop multiple ref={inputRef} onChange={(e) => console.log(e.target.files)} />
		</main>
	);
}
