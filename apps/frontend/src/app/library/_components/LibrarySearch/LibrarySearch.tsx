"use client";
import { DocumentNameSearch } from "./DocumentNameSearch";
import { useNavigateToSearchValue } from "../utils";
import type { LibrarySearchProps } from "./types";
import { LibraryCombobox } from "./LibraryCombobox";
import { YEAR_RANGE } from "../../constants";

export function LibrarySearch({
	query,
	allCategories,
	allDocumentTypes,
	allSubjects,
}: Readonly<LibrarySearchProps>) {
	const navigateToSearchValue = useNavigateToSearchValue();

	return (
		<section className="space-y-3">
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
				<LibraryCombobox
					key={`category-${query?.category ?? ""}`}
					label="Category"
					placeholder="eg. A Levels"
					items={allCategories.data?.length ? allCategories.data : []}
					defaultValue={
						query?.category
							? allCategories.data?.find((t) => query.category === t.name.toString())
							: undefined
					}
					onValueChange={(newValue) =>
						navigateToSearchValue(
							{
								name: "category",
								value: newValue ? String(newValue.name) : "",
							},
							{
								// reset subject if category changes
								name: "subject",
								value: "",
							},
						)
					}
				/>
				<LibraryCombobox
					key={`subject-${query?.subject ?? ""}-${query?.category ?? ""}`}
					label="Subject"
					placeholder="eg. H2 Math"
					items={allSubjects.data?.length ? allSubjects.data : []}
					defaultValue={
						query?.subject && query?.category
							? allSubjects.data?.find((t) => query.subject === t.name.toString())
							: undefined
					}
					onValueChange={(newValue) =>
						navigateToSearchValue({ name: "subject", value: newValue ? String(newValue.name) : "" })
					}
					disabled={!query?.category}
					overrideDisplayValue={() =>
						query?.subject && query?.category
							? (allSubjects.data?.find((t) => query.subject === t.name.toString())?.name ?? "")
							: ""
					}
				/>
				<LibraryCombobox
					key={`year-${query?.year ?? ""}`}
					label="Year"
					placeholder={`eg. ${new Date().getFullYear()}`}
					items={Array.from(
						{ length: YEAR_RANGE[1] - YEAR_RANGE[0] + 1 },
						(_, i) => YEAR_RANGE[0] + i,
					).map((year) => ({ id: year, name: String(year) }))}
					defaultValue={
						query?.year ? { id: Number(query.year), name: String(query.year) } : undefined
					}
					onValueChange={(newValue) =>
						navigateToSearchValue({
							name: "year",
							value: newValue ? String(newValue.name) : "",
						})
					}
				/>
				<LibraryCombobox
					key={`doc_type-${query?.doc_type ?? ""}`}
					label="Document Type"
					placeholder="eg. Exam Papers"
					items={allDocumentTypes.data?.length ? allDocumentTypes.data : []}
					defaultValue={
						query?.doc_type
							? allDocumentTypes.data?.find((t) => query.doc_type === t.name.toString())
							: undefined
					}
					onValueChange={(newValue) =>
						navigateToSearchValue({
							name: "doc_type",
							value: newValue ? String(newValue.name) : "",
						})
					}
				/>
			</div>

			<DocumentNameSearch
				key={`keyword-${query?.keyword ?? ""}`}
				defaultValue={query?.keyword}
				onChange={(value) => navigateToSearchValue({ name: "keyword", value })}
			/>
		</section>
	);
}
