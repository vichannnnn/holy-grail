"use client";
import { FileDrop, Text, type FileDropHandle, Title, Button } from "@shared/ui/components";
import Image from "next/image";
import { useRef, useState } from "react";
import type { UploadWorkspaceProps } from "./types";

export function UploadWorkspace({ fetchSubjects }: UploadWorkspaceProps) {
	const fileDropRef = useRef<FileDropHandle>(null);
	// be very careful to sync this state with the FileDrop's internal state
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

	const deleteFile = (fileName: string) => {
		if (fileDropRef.current) {
			fileDropRef.current.removeByName(fileName);
			// update local state to reflect the change
			if (fileDropRef.current.input && fileDropRef.current.input.files) {
				setSelectedFiles(fileDropRef.current.input.files);
			} else {
				setSelectedFiles(null);
			}
		}
	};

	return (
		<div className="w-full flex flex-col items-center">
			<div className="flex flex-col items-center mb-4 shadow-sm dark:shadow-none bg-gray-200 dark:bg-gray-600 p-4 rounded-lg w-full">
				{selectedFiles !== null && selectedFiles.length !== 0 ? (
					<div className="w-full">
						{Array.from(selectedFiles).map((file) => (
							<div
								key={file.name}
								className="flex justify-between items-center mb-1 p-2 bg-white dark:bg-gray-800 rounded"
							>
								<span>{file.name}</span>
								<button
									onClick={() => deleteFile(file.name)}
									className="text-red-500 hover:text-red-700"
								>
									Delete
								</button>
								<button
									onClick={() => fetchSubjects()}
									className="text-blue-500 hover:text-blue-700"
								>
									Fetch Subjects
								</button>
							</div>
						))}
						<div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
							<Text description className="flex-1 text-xs">
								By uploading, you agree to have read and accepted our terms of service. Your files
								will be reviewed by our admin team before being published.
							</Text>
							<Button className="sm:ml-auto">Upload!</Button>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center py-12">
						<Image src="/trimmy-grail-chan-sparkling.webp" alt="Error" width={100} height={100} />
						<Title order={2} className="font-bold mb-4">
							No files selected yet!
						</Title>
						<Text>Upload some files below to get started.</Text>
					</div>
				)}
			</div>
			<FileDrop
				multiple
				retainFiles
				ref={fileDropRef}
				onChange={(e) => setSelectedFiles(e.target.files)}
			/>
		</div>
	);
}
