"use client";

import { Tabs, Text, Title, Button } from "@shared/ui/components";
import Image from "next/image";
import { DataTable } from "./DataTable";
import { CategoryEdit } from "./CategoryEdit";
import { SubjectEdit } from "./SubjectEdit";
import { DocumentTypeEdit } from "./DocumentTypeEdit";
import { UsersTab } from "./UsersTab";
import type { DeveloperContentProps } from "./types";
import { Pencil } from "@phosphor-icons/react";

export function DeveloperContent({
	categories,
	subjects,
	documentTypes,
}: Readonly<DeveloperContentProps>) {
	const tabs = [
		{
			name: `Categories (${categories.data?.length ?? 0})`,
			content: renderTabContent(
				categories,
				["id", "name"],
				(category) => (
					<CategoryEdit
						category={category}
						render={({ toggleOpen }) => (
							<Button variant="ghost" onClick={toggleOpen} className="p-1">
								<Pencil className="h-4 w-4" />
							</Button>
						)}
					/>
				),
				() => (
					<CategoryEdit
						render={({ toggleOpen }) => <Button onClick={toggleOpen}>Add Category</Button>}
					/>
				),
			),
		},
		{
			name: `Subjects (${subjects.data?.length ?? 0})`,
			content: renderTabContent(
				subjects,
				["id", "name", "category"],
				(subject) => (
					<SubjectEdit
						subject={subject}
						categories={categories.data || []}
						render={({ toggleOpen }) => (
							<Button variant="ghost" onClick={toggleOpen} className="p-1">
								<Pencil className="h-4 w-4" />
							</Button>
						)}
					/>
				),
				() => (
					<SubjectEdit
						categories={categories.data || []}
						render={({ toggleOpen }) => <Button onClick={toggleOpen}>Add Subject</Button>}
					/>
				),
			),
		},
		{
			name: `Document Types (${documentTypes.data?.length ?? 0})`,
			content: renderTabContent(
				documentTypes,
				["id", "name"],
				(documentType) => (
					<DocumentTypeEdit
						documentType={documentType}
						render={({ toggleOpen }) => (
							<Button variant="ghost" onClick={toggleOpen} className="p-1">
								<Pencil className="h-4 w-4" />
							</Button>
						)}
					/>
				),
				() => (
					<DocumentTypeEdit
						render={({ toggleOpen }) => <Button onClick={toggleOpen}>Add Document Type</Button>}
					/>
				),
			),
		},
		{
			name: "Users",
			content: <UsersTab />,
		},
	];

	return <Tabs tabs={tabs} defaultIndex={0} />;
}

function renderTabContent<T>(
	response: { ok: boolean; data?: T[]; err?: string },
	columns: string[],
	renderEditAction?: (item: T) => React.ReactNode,
	renderAddAction?: () => React.ReactNode,
) {
	if (!response.ok || !response.data) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<div className="relative mb-4">
					<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-coral/20 to-amber/20 blur-2xl dark:from-coral/10 dark:to-amber/10" />
					<Image src="/trimmy-grail-chan-sparkling.webp" alt="Error" width={100} height={100} className="relative" />
				</div>
				<Title order={2} className="font-bold mb-2 text-navy-deep dark:text-cream">
					Something went wrong
				</Title>
				<Text className="text-navy/70 dark:text-cream/60">{response.err ?? "An unknown error occurred."}</Text>
			</div>
		);
	}

	if (response.data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<div className="relative mb-4">
					<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-amber/20 to-coral/20 blur-2xl dark:from-amber/10 dark:to-coral/10" />
					<Image src="/trimmy-grail-chan-sparkling.webp" alt="No Results" width={100} height={100} className="relative" />
				</div>
				<Title order={2} className="font-bold mb-2 text-navy-deep dark:text-cream">
					No data found
				</Title>
				<Text className="text-navy/70 dark:text-cream/60">This section appears to be empty.</Text>
				{renderAddAction && <div className="mt-4">{renderAddAction()}</div>}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{renderAddAction && <div className="flex justify-end">{renderAddAction()}</div>}
			<DataTable data={response.data} columns={columns} renderEditAction={renderEditAction} />
		</div>
	);
}
