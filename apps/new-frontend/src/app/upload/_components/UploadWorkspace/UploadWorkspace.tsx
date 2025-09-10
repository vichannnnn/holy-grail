"use client";
import { FileDrop, Text, type FileDropHandle, Title, Button } from "@shared/ui/components";
import Image from "next/image";
import { useRef } from "react";
import type { UploadWorkspaceProps } from "./types";
import { UploadEntry } from "./UploadEntry";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotesSchema, SUPPORTED_FORMATS } from "./schemas";
import type { NotesFormData } from "./types";

export function UploadWorkspace({ categories, documentTypes }: UploadWorkspaceProps) {
	const fileDropRef = useRef<FileDropHandle>(null);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<NotesFormData>({
		resolver: zodResolver(NotesSchema),
		defaultValues: {
			notes: [],
		},
	});

	const { fields, append, remove, update } = useFieldArray({
		control,
		name: "notes",
	});

	// hack: Sync form fields with selected files
	const syncFormWithFiles = (fileList: FileList | null) => {
		if (!fileList || fileList.length === 0) {
			// Remove all fields if no files
			for (let i = fields.length - 1; i >= 0; i--) {
				remove(i);
			}
			return;
		}

		const currentFiles = Array.from(fileList);
		const currentFileNames = currentFiles.map((f) => f.name);

		// Remove fields for files that no longer exist
		for (let i = fields.length - 1; i >= 0; i--) {
			const field = fields[i];
			if (!currentFileNames.includes(field.file.name)) {
				remove(i);
			}
		}

		// Add fields for new files
		const existingFileNames = fields.map((field) => field.file.name);
		currentFiles.forEach((file) => {
			if (!existingFileNames.includes(file.name)) {
				append({
					name: file.name,
					subject: 0,
					type: 0,
					category: 0,
					file: file,
				});
			}
		});
	};

	const deleteFile = (fileName: string, fieldIndex: number) => {
		if (fileDropRef.current) {
			fileDropRef.current.removeByName(fileName);
			// Remove the form field
			remove(fieldIndex);
		}
	};

	const onSubmit = (data: NotesFormData) => {
		console.log("Form submitted:", data);
		// Handle form submission here - data now contains the correct values!
	};

	// Sync form when files change
	const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = e.target.files;
		syncFormWithFiles(newFiles);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
			<div className="flex flex-col items-center mb-4 shadow-sm dark:shadow-none bg-gray-200 dark:bg-gray-600/20 p-4 rounded-lg w-full">
				{fields.length > 0 ? (
					<div className="w-full">
						{fields.map((field, index) => (
							<UploadEntry
								key={field.id}
								file={field.file}
								index={index}
								control={control}
								setValue={setValue}
								onDelete={(fileName) => deleteFile(fileName, index)}
								categories={categories}
								documentTypes={documentTypes}
								errors={errors.notes?.[index]}
								totalEntries={fields.length}
							/>
						))}
						<div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
							<Text description className="flex-1 text-xs">
								By uploading, you agree to have read and accepted our terms of service. Your files
								will be reviewed by our admin team before being published.
							</Text>
							<Button type="submit" className="sm:ml-auto">
								Upload!
							</Button>
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
				onChange={handleFilesChange}
				accept={SUPPORTED_FORMATS.join(",")}
			/>
		</form>
	);
}
