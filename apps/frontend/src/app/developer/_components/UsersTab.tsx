"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Pencil, MagnifyingGlass } from "@phosphor-icons/react";
import { Text, Title, Button, Input } from "@shared/ui/components";
import { Pagination } from "@lib/features/client";
import { DataTable } from "./DataTable";
import { UserEdit } from "./UserEdit";
import { fetchUsers } from "../actions";
import type { PaginatedUsers } from "./types";

const PAGE_SIZE = 20;
const DEBOUNCE_DELAY = 300;

export function UsersTab() {
	const [isPending, startTransition] = useTransition();
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [data, setData] = useState<PaginatedUsers | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch((prev) => {
				if (searchTerm !== prev) {
					setCurrentPage(1);
				}
				return searchTerm;
			});
		}, DEBOUNCE_DELAY);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		startTransition(async () => {
			const response = await fetchUsers(currentPage, PAGE_SIZE, debouncedSearch || undefined);
			if (response.ok && response.data) {
				setData(response.data);
				setError(null);
			} else {
				setError(response.err ?? "An unknown error occurred.");
				setData(null);
			}
		});
	}, [currentPage, debouncedSearch]);

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

	const showEmptyState = data?.items.length === 0;

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<Input
					placeholder="Search by username..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					icon={<MagnifyingGlass className="h-4 w-4 text-gray-400" />}
					containerClassName="flex-1 max-w-sm"
				/>
			</div>

			{isPending && !data ? (
				<div className="flex flex-col items-center justify-center py-12">
					<Text>Loading users...</Text>
				</div>
			) : showEmptyState ? (
				<div className="flex flex-col items-center justify-center py-12">
					<Image src="/trimmy-grail-chan-sparkling.webp" alt="No Results" width={100} height={100} />
					<Title order={2} className="font-bold mb-4">
						No users found
					</Title>
					<Text>
						{searchTerm ? `No users matching "${searchTerm}"` : "There are no registered users."}
					</Text>
				</div>
			) : data ? (
				<>
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
				</>
			) : null}
		</div>
	);
}
