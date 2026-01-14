"use client";
import type { PaginationProps } from "./types";
import { Button, Text } from "@shared/ui/components";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	return (
		<div className="flex justify-center items-center space-x-4 mt-4">
			<Button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				variant="ghost"
				className="flex items-center space-x-2"
			>
				<CaretLeft className="h-5 w-5" />
				<span>Previous</span>
			</Button>
			<Text>
				Page {currentPage} of {totalPages}
			</Text>
			<Button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage >= totalPages || totalPages === 0}
				variant="ghost"
				className="flex items-center space-x-2"
			>
				<span>Next</span>
				<CaretRight className="h-5 w-5" />
			</Button>
		</div>
	);
}
