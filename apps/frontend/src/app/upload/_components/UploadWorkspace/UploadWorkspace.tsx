"use client";
import { FileDrop, Text, type FileDropHandle, Title, Button } from "@shared/ui/components";
import Image from "next/image";
import Link from "next/link";
import { useRef, useTransition } from "react";
import toast from "react-hot-toast";
import type { UploadWorkspaceProps, NotesFormData } from "./types";
import { UploadEntry } from "./UploadEntry";
import { UploadGuidelines } from "../UploadGuidelines";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotesSchema, SUPPORTED_FORMATS } from "./schemas";
import { uploadNotes } from "./actions";
import { useRouter } from "next/navigation";

export function UploadWorkspace({ categories, documentTypes }: Readonly<UploadWorkspaceProps>) {
	const fileDropRef = useRef<FileDropHandle>(null);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

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

	const { fields, append, remove } = useFieldArray({
		control,
		name: "notes",
	});

	// hack: Sync form fields with selected files
	const syncFormWithFiles = (fileList: FileList | null) => {
		if (!fileList?.length) {
			setValue("notes", []);
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
				// Extract filename without extension for the default name
				const lastDotIndex = file.name.lastIndexOf(".");
				const nameWithoutExtension =
					lastDotIndex > 0 ? file.name.substring(0, lastDotIndex) : file.name;

				append({
					name: nameWithoutExtension,
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

	const onSubmit = async (data: NotesFormData) => {
		const formData = new FormData();

		data.notes.forEach((note, i) => {
			// backend expects these exact keys: `${i}[file]`, `${i}[category]`, `${i}[subject]`, `${i}[type]`, `${i}[year]`, `${i}[name]`
			formData.append(`${i}[file]`, note.file as File);
			formData.append(`${i}[category]`, String(note.category));
			formData.append(`${i}[subject]`, String(note.subject));
			formData.append(`${i}[type]`, String(note.type));
			// send "0" when year is absent to match backend parsing behavior
			formData.append(`${i}[year]`, note.year ? String(note.year) : "0");
			formData.append(`${i}[name]`, note.name ?? "");
		});

		startTransition(async () => {
			try {
				const result = await uploadNotes(formData);

				if (result.ok) {
					toast.success(result.message);
					router.push("/");
				} else {
					toast.error(result.message);
				}
			} catch (error) {
				console.error("Upload failed:", error);
				toast.error("An unexpected error occurred. Please try again.");
			}
		});
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
								By uploading, you agree to have read and accepted our{" "}
								<Link
									href="/terms-of-service"
									className="underline hover:text-blue-500 transition-colors cursor-pointer inline"
								>
									terms of service
								</Link>{" "}
								and the <UploadGuidelines>uploading guidelines</UploadGuidelines>. Your files will
								be reviewed by our admin team before being published.
							</Text>
							<Button type="submit" className="sm:ml-auto" disabled={isPending}>
								{isPending ? "Uploading..." : "Upload!"}
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
