"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useEffect, useRef } from "react";

import { Button } from "@components/Button";

import { AuthContext } from "@providers/AuthProvider";

interface FileSelectProps {
	handleAddNotes: (files: FileList) => void;
}

export const FileSelect = ({ handleAddNotes }: FileSelectProps) => {
	const dragDropRef = useRef<HTMLDivElement | null>(null);
	const fileRef = useRef<HTMLInputElement | null>(null);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const drop = dragDropRef.current as HTMLDivElement;
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

		if (e.dataTransfer) {
			const files = e.dataTransfer.files;
			const giveFiles = new DataTransfer();
			for (const file of files) {
				giveFiles.items.add(file);
			}
			(fileRef.current as HTMLInputElement).files = giveFiles.files;
			const forcedChange = new Event("change", { bubbles: true });
			(fileRef.current as HTMLInputElement).dispatchEvent(forcedChange);
		}
	};

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<div
			className="flex flex-col items-center mt-4 md:mt-0 justify-center py-0 md:py-12 rounded-xl w-0 md:w-[60vw] border-none md:border-2 md:border-dashed md:border-[#c3c3c3]"
			ref={dragDropRef}
		>
			<div className="m-4 hidden md:block">
				<p>Drag and drop your PDFs here, or</p>
			</div>

			<Button
				variant="contained"
				sx={{
					"& p, & span": { color: "#484b6a" },
					backgroundColor: "#FFA5A5",
					"&:hover": {
						backgroundColor: "#cc8484",
						border: "none",
					},
				}}
				component="label"
				startIcon={<CloudUploadIcon />}
			>
				<p>Upload Files</p>
				<input
					className="hidden"
					multiple
					ref={fileRef}
					type="file"
					accept={user && user.role === 3 ? "application/pdf, application/zip" : "application/pdf"}
					onChange={(event) => {
						if (event.target.files) {
							handleAddNotes(event.target.files);
							const clearValue = new DataTransfer();
							(fileRef.current as HTMLInputElement).files = clearValue.files;
						}
					}}
				/>
			</Button>
		</div>
	);
};
