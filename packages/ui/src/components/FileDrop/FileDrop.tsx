"use client";
import { Button, Text } from "..";
import type { FileDropProps } from "./types";
import { useRef, useEffect, useState, useImperativeHandle } from "react";
import { twMerge } from "tailwind-merge";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export function FileDrop({
	optional,
	retainFiles = false,
	className,
	disabled,
	ref,
	...props
}: FileDropProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

	useImperativeHandle(
		ref,
		() => ({
			input: inputRef.current,
			removeByName: (name: string) => {
				if (!inputRef.current || !inputRef.current.files) return;
				const dt = new DataTransfer();
				Array.from(inputRef.current.files)
					.filter((file) => file.name !== name)
					.forEach((file) => dt.items.add(file));
				inputRef.current.files = dt.files;
				setUploadedFiles(dt.files);
			},
			clear: () => {
				if (!inputRef.current) return;
				inputRef.current.value = "";
				setUploadedFiles(null);
			},
		}),
		[inputRef],
	);

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

			// If retainFiles is true, multiple is true, and we already have files, add them first
			if (retainFiles && props.multiple && inputRef.current.files) {
				for (const file of Array.from(inputRef.current.files)) {
					giveFiles.items.add(file);
				}
			}

			// Helper function to get unique file name
			const getUniqueFileName = (file: File, existingFiles: File[]): File => {
				const existingNames = existingFiles.map((f) => f.name);
				let fileName = file.name;
				let idx = 1;

				// Extract name and extension
				const lastDotIndex = fileName.lastIndexOf(".");
				const name = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
				const extension = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : "";

				// Keep incrementing suffix until we find a unique name
				while (existingNames.includes(fileName)) {
					fileName = `${name}_${idx}${extension}`;
					idx++;
				}

				// If name changed, create a new File object with the new name
				if (fileName !== file.name) {
					return new File([file], fileName, { type: file.type, lastModified: file.lastModified });
				}
				return file;
			};

			// if multiple files are not allowed, only the first file will be added
			if (!props.multiple) {
				// For single file mode, always replace with the new file (retainFiles doesn't apply)
				giveFiles.items.clear();
				giveFiles.items.add(files[0] as File);
			} else {
				// For multiple files mode, add new files (retain existing if retainFiles is true)
				const existingFiles = Array.from(giveFiles.files);
				for (const file of Array.from(files)) {
					const uniqueFile = getUniqueFileName(file, existingFiles);
					giveFiles.items.add(uniqueFile);
					existingFiles.push(uniqueFile);
				}
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
				"w-full h-full py-4 border-2 border-dashed border-pink-500 dark:border-pink-400 rounded-lg flex flex-col items-center justify-center gap-2",
				disabled ? "cursor-not-allowed" : "cursor-pointer",
				className,
			)}
		>
			<CloudArrowUpIcon className="size-18 lg:size-36 stroke-gray-700 dark:stroke-gray-500" />

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
			</Button>

			<input
				ref={inputRef}
				type="file"
				className="hidden"
				disabled={disabled}
				{...props}
				onChange={(e) => {
					setUploadedFiles(e.target.files);

					props.onChange?.(e);
				}}
			/>
		</div>
	);
}
