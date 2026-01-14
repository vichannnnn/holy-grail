import { useState, useTransition } from "react";
import type { CategoryType, DocumentType, SubjectType } from "@/app/library/types";
import { fetchAllCategories, fetchAllDocumentTypes, fetchAllSubjects } from "@/app/library/actions";
import toast from "react-hot-toast";

export interface InitialFormDataReturn {
	categories: CategoryType[];
	documentTypes: DocumentType[];
	isPending: boolean;
	fetchData: () => void;
}

export interface SubjectsReturn {
	subjects: SubjectType[];
	isPending: boolean;
	fetchSubjects: (categoryId: number) => void;
	clearSubjects: () => void;
}

export interface FormSubmissionReturn {
	isSubmitting: boolean;
	withSubmission: <T>(asyncFn: () => Promise<T>) => Promise<T>;
}

/**
 * Custom hook for managing categories and document types data
 * Handles the initial loading of form options when the modal opens
 * @returns Object containing categories, documentTypes, loading state, and fetch function
 */
export function useInitialFormData(): InitialFormDataReturn {
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
	const [isPending, startTransition] = useTransition();

	const fetchData = () => {
		startTransition(async () => {
			try {
				const [categoriesResult, documentTypesResult] = await Promise.all([
					fetchAllCategories(),
					fetchAllDocumentTypes(),
				]);

				if (categoriesResult.ok && categoriesResult.data) {
					setCategories(categoriesResult.data);
				}

				if (documentTypesResult.ok && documentTypesResult.data) {
					setDocumentTypes(documentTypesResult.data);
				}
			} catch {
				toast.error("Failed to load form data");
			}
		});
	};

	return {
		categories,
		documentTypes,
		isPending,
		fetchData,
	};
}

/**
 * Custom hook for managing subjects data based on category selection
 * Handles fetching subjects when a category is selected or changed
 * @returns Object containing subjects, loading state, and management functions
 */
export function useSubjects(): SubjectsReturn {
	const [subjects, setSubjects] = useState<SubjectType[]>([]);
	const [isPending, startTransition] = useTransition();

	const fetchSubjects = (categoryId: number) => {
		if (!categoryId || categoryId <= 0) {
			setSubjects([]);
			return;
		}

		startTransition(async () => {
			try {
				const subjectsResult = await fetchAllSubjects(categoryId);
				if (subjectsResult.ok && subjectsResult.data) {
					setSubjects(subjectsResult.data);
				}
			} catch {
				toast.error("Failed to load subjects");
			}
		});
	};

	const clearSubjects = () => {
		setSubjects([]);
	};

	return {
		subjects,
		isPending,
		fetchSubjects,
		clearSubjects,
	};
}

/**
 * Custom hook for managing form submission state
 * Provides a wrapper function to handle loading states during async operations
 * @returns Object containing submission state and wrapper function
 */
export function useFormSubmission(): FormSubmissionReturn {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const withSubmission = async <T>(asyncFn: () => Promise<T>): Promise<T> => {
		setIsSubmitting(true);
		try {
			return await asyncFn();
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		isSubmitting,
		withSubmission,
	};
}
