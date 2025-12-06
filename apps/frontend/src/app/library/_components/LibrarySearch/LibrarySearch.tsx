"use client";
import { DocumentNameSearch } from "./DocumentNameSearch";
import { useNavigateToSearchValue } from "../utils";
import type { LibrarySearchProps } from "./types";
import { LibraryCombobox } from "./LibraryCombobox";
import { MAPPED_YEAR_RANGE } from "@lib/features/AdminEdit/constants.ts";
import { FavouriteSwitch } from "./FavouriteSwitch.tsx"

export function LibrarySearch({
	query,
	allCategories,
	allDocumentTypes,
	allSubjects,
    adminPanel,
    isAuthenticated
}: Readonly<LibrarySearchProps>) {
	const navigateToSearchValue = useNavigateToSearchValue();

	return (
		<section className="space-y-2 mx-6 md:mx-12">
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
				<LibraryCombobox
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
					label="Year"
					placeholder={`eg. ${new Date().getFullYear()}`}
					items={MAPPED_YEAR_RANGE}
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

            <div className="flex sm:flex-row flex-col">

                <div className="flex-grow">
                    <DocumentNameSearch
                        defaultValue={query?.keyword}
                        onChange={(value) => navigateToSearchValue({ name: "keyword", value })}
                    />
                </div>

                <div className={`${ adminPanel || !isAuthenticated ? "hidden" : ""} sm:ml-4 my-1 sm:my-0`}>
                    <FavouriteSwitch
                        query={query}
                    />
                </div>
            </div>

		</section>
	);
}
