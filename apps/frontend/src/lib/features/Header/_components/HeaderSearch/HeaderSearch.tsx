"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState, useRef, useContext } from "react";
import { ClientContext } from "@shared/ui/providers";

export function HeaderSearch() {
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const { isMobile } = useContext(ClientContext);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			router.push(`/library?keyword=${encodeURIComponent(query.trim())}`);
			setQuery("");
			inputRef.current?.blur();
		}
	};

	const handleIconClick = () => {
		if (isMobile) {
			router.push("/library");
		} else {
			inputRef.current?.focus();
		}
	};

	if (isMobile) {
		return (
			<button
				type="button"
				onClick={handleIconClick}
				className="p-2 rounded-lg text-navy/70 hover:text-navy hover:bg-cream-dark dark:text-cream/70 dark:hover:text-cream dark:hover:bg-navy transition-colors"
				aria-label="Search notes"
			>
				<MagnifyingGlass className="size-5" weight="bold" />
			</button>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="relative">
			<div
				className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 ease-out ${
					isFocused
						? "w-72 border-amber bg-white dark:bg-navy ring-2 ring-amber/30"
						: "w-48 border-navy/20 dark:border-cream/20 bg-white/50 dark:bg-navy/50 hover:border-navy/40 dark:hover:border-cream/40"
				}`}
			>
				<MagnifyingGlass
					className="size-4 text-navy/50 dark:text-cream/50 shrink-0 cursor-pointer"
					weight="bold"
					onClick={handleIconClick}
				/>
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder="Search notes..."
					className="flex-1 bg-transparent text-sm text-navy dark:text-cream placeholder:text-navy/40 dark:placeholder:text-cream/40 outline-none"
				/>
			</div>
		</form>
	);
}
