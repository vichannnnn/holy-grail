"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Pencil } from "@phosphor-icons/react";
import { Text, Title, Button } from "@shared/ui/components";
import { Pagination } from "@lib/features/client";
import { DataTable } from "./DataTable";
import { UserEdit } from "./UserEdit";
import { fetchUsers } from "../actions";
import type { PaginatedUsers } from "./types";

const PAGE_SIZE = 20;

export function UsersTab() {
	const [isPending, startTransition] = useTransition();
	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState<PaginatedUsers | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		startTransition(async () => {
			const response = await fetchUsers(currentPage, PAGE_SIZE);
			if (response.ok && response.data) {
				setData(response.data);
				setError(null);
			} else {
				setError(response.err ?? "An unknown error occurred.");
				setData(null);
			}
		});
	}, [currentPage]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<Image src="/trimmy-grail-chan-sparkling.webp" alt="Error" width={100} height={100} />
				<Title order={2} className="font-bold mb-4">
					We ran into an issue :(
				</Title>
				<Text>{error}</Text>
			</div>
		);
	}

	if (!data || isPending) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<Text>Loading users...</Text>
			</div>
		);
	}

	if (data.items.length === 0 && data.page === 1) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<Image src="/trimmy-grail-chan-sparkling.webp" alt="No Results" width={100} height={100} />
				<Title order={2} className="font-bold mb-4">
					No users found
				</Title>
				<Text>There are no registered users.</Text>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<DataTable
				data={data.items}
				columns={["user_id", "username", "email", "role"]}
				renderEditAction={(user) => (
					<UserEdit
						user={user}
						render={({ toggleOpen }) => (
							<Button variant="ghost" onClick={toggleOpen} className="p-1">
								<Pencil className="h-4 w-4" />
							</Button>
						)}
					/>
				)}
			/>
			<Pagination
				currentPage={data.page}
				totalPages={data.pages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
