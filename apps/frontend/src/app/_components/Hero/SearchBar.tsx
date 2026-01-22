"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function SearchBar() {
	const router = useRouter();
	const [query, setQuery] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			router.push(`/library?keyword=${encodeURIComponent(query.trim())}`);
		} else {
			router.push("/library");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="relative max-w-md">
			<div className="group relative">
				<div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber/50 to-coral/50 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
				<div className="relative flex items-center">
					<MagnifyingGlassIcon className="pointer-events-none absolute left-4 size-5 text-navy/40 dark:text-cream/40" />
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search O-Level Math notes..."
						className="w-full rounded-xl border border-navy/10 bg-white py-3 pl-12 pr-4 text-navy-deep placeholder-navy/40 shadow-lg shadow-navy/5 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30 dark:border-cream/10 dark:bg-navy dark:text-cream dark:placeholder-cream/40 dark:shadow-none dark:focus:border-amber dark:focus:ring-amber/20"
					/>
				</div>
			</div>
			<p className="mt-2 text-center text-sm text-navy/50 dark:text-cream/50 md:text-left">
				Or browse by subject in the library
			</p>
		</form>
	);
}
