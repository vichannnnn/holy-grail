"use client";
import { X, List, MagnifyingGlass } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@lib/auth";
import { NAV_LINKS } from "../HeaderMiddle/constants";

interface MobileDrawerProps {
	user: User | null;
	authContent: React.ReactNode;
	userContent: React.ReactNode;
}

export function MobileDrawer({ user, authContent, userContent }: MobileDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [mounted, setMounted] = useState(false);
	const drawerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/library?keyword=${encodeURIComponent(searchQuery.trim())}`);
			setSearchQuery("");
			setIsOpen(false);
		}
	};

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	const drawerContent = (
		<>
			{isOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300"
					onClick={() => setIsOpen(false)}
					onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
					aria-hidden="true"
				/>
			)}

			<div
				ref={drawerRef}
				className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-cream dark:bg-navy-deep shadow-xl transition-transform duration-300 ease-out ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
				role="dialog"
				aria-modal="true"
				aria-label="Navigation menu"
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between p-4 border-b border-navy/10 dark:border-cream/10">
						<span className="text-lg font-semibold text-navy dark:text-cream">Menu</span>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="p-2 rounded-lg text-navy/70 hover:text-navy hover:bg-cream-dark dark:text-cream/70 dark:hover:text-cream dark:hover:bg-navy transition-colors"
							aria-label="Close menu"
						>
							<X className="size-5" weight="bold" />
						</button>
					</div>

					<div className="p-4 border-b border-navy/10 dark:border-cream/10">
						<form onSubmit={handleSearchSubmit} className="relative">
							<div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-navy/20 dark:border-cream/20 bg-white/50 dark:bg-navy/50 focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/30">
								<MagnifyingGlass className="size-4 text-navy/50 dark:text-cream/50 shrink-0" weight="bold" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search notes..."
									className="flex-1 bg-transparent text-sm text-navy dark:text-cream placeholder:text-navy/40 dark:placeholder:text-cream/40 outline-none"
								/>
							</div>
						</form>
					</div>

					<nav className="flex-1 overflow-y-auto p-4">
						<ul className="space-y-1">
							{Object.entries(NAV_LINKS).map(([key, { label, href }]) => (
								<li key={key}>
									<Link
										href={href}
										onClick={handleLinkClick}
										className="block px-4 py-3 rounded-lg text-navy/80 dark:text-cream/80 hover:text-navy dark:hover:text-cream hover:bg-cream-dark dark:hover:bg-navy font-medium transition-colors"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className="p-4 border-t border-navy/10 dark:border-cream/10">
						<div onClick={handleLinkClick} onKeyDown={(e) => e.key === "Enter" && handleLinkClick()}>
							{user ? userContent : authContent}
						</div>
					</div>
				</div>
			</div>
		</>
	);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="p-2 rounded-lg text-navy/70 hover:text-navy hover:bg-cream-dark dark:text-cream/70 dark:hover:text-cream dark:hover:bg-navy transition-colors"
				aria-label="Open menu"
				aria-expanded={isOpen}
			>
				<List className="size-6" weight="bold" />
			</button>

			{mounted && createPortal(drawerContent, document.body)}
		</>
	);
}
