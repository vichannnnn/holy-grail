"use client";
import { Button, Text } from "..";
import type { FileDropProps } from "./types";
import { useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function FileDrop({ optional, className, disabled, ...props }: FileDropProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

	useEffect(() => {
		if (!containerRef.current || !inputRef.current) return;

		const drop = containerRef.current;
		drop.addEventListener("dragover", handleDragOver);
		drop.addEventListener("drop", handleDrop);
		return () => {
			drop.removeEventListener("dragover", handleDragOver);
			drop.removeEventListener("drop", handleDrop);
		};
	}, []);

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (e.dataTransfer && inputRef.current) {
			const files = e.dataTransfer.files;
			if (files.length === 0) return;
			const giveFiles = new DataTransfer();

			// if multiple files are not allowed, only the first file will be added
			if (!props.multiple) giveFiles.items.add(files[0] as File);
			else
				for (const file of Array.from(files)) {
					giveFiles.items.add(file);
				}
			inputRef.current.files = giveFiles.files;

			// trigger change event
			const forcedChange = new Event("change", { bubbles: true });
			inputRef.current.dispatchEvent(forcedChange);
		}
	};

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<div
			ref={containerRef}
			className={twMerge(
				"w-full h-full py-4 border-2 border-dashed border-blue-500 dark:border-blue-400 rounded-lg flex flex-col items-center justify-center gap-2",
				disabled ? "cursor-not-allowed" : "cursor-pointer",
				className,
			)}
		>
			<svg
				className="w-1/5 h-1/5 text-gray-600 dark:text-gray-400"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path d="M13.383 4.076a6.5 6.5 0 0 0-6.887 3.95A5 5 0 0 0 7 18h3v-4a2 2 0 0 1-1.414-3.414l2-2a2 2 0 0 1 2.828 0l2 2A2 2 0 0 1 14 14v4h4a4 4 0 0 0 .988-7.876 6.5 6.5 0 0 0-5.605-6.048Z" />
				<path d="M12.707 9.293a1 1 0 0 0-1.414 0l-2 2a1 1 0 1 0 1.414 1.414l.293-.293V19a1 1 0 1 0 2 0v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-2-2Z" />
			</svg>
			{uploadedFiles === null ? (
				<Text description>
					{optional && "(Optional) "}
					Drop files here, or
				</Text>
			) : (
				<div className="flex flex-col items-center justify-center gap-0.5 px-1">
					<Text description>
						{uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""} selected
					</Text>
					<Text description className="flex flex-col text-xs">
						{Array.from(uploadedFiles).map((file) => (
							<span key={file.name} className="break-all">
								{file.name}
							</span>
						))}
					</Text>
				</div>
			)}

			<Button onClick={() => inputRef.current?.click()} disabled={disabled}>
				{uploadedFiles === null ? "Select files" : "Reselect files"}
				<input
					ref={inputRef}
					type="file"
					className="hidden"
					disabled={disabled}
					onChange={(e) => {
						setUploadedFiles(e.target.files);
						props.onChange?.(e);
					}}
					{...props}
				/>
			</Button>
		</div>
	);
}
