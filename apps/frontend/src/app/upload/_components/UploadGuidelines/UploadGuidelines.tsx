"use client";

import { useState } from "react";
import { Modal, Title, Text, Button } from "@shared/ui/components";
import type { UploadGuidelinesProps } from "./types";

export function UploadGuidelines({ children }: Readonly<UploadGuidelinesProps>) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="underline hover:text-blue-500 transition-colors cursor-pointer inline"
			>
				{children}
			</button>

			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<div className="space-y-4">
					<Title order={2} className="font-bold text-xl mb-4">
						Upload Guidelines
					</Title>

					<div className="space-y-3 max-h-96 overflow-y-auto text-zinc-700 dark:text-zinc-300">
						<div>
							<Title order={3} className="font-semibold text-lg mb-2">
								File Requirements
							</Title>
							<ul className="list-disc list-inside space-y-1 text-sm marker:text-zinc-700 dark:marker:text-zinc-300">
								<li>Maximum file size: 500MB per file</li>
								<li>Supported formats: PDF, ZIP</li>
								<li>Maximum files per upload: 25</li>
							</ul>
						</div>
						<div>
							<Title order={3} className="font-semibold text-lg mb-2">
								Quality Guidelines
							</Title>
							<ul className="list-disc list-inside space-y-1 text-sm marker:text-zinc-700 dark:marker:text-zinc-300">
								<li>
									Try to adhere to the naming scheme: [school] [year] [chapter title/paper
									component].
								</li>
								<li>Distinguish between exam types (eg. between mid-year and prelim papers).</li>
							</ul>
						</div>

						<div>
							<Title order={3} className="font-semibold text-lg mb-2">
								Content Standards
							</Title>
							<ul className="list-disc list-inside space-y-1 text-sm marker:text-zinc-700 dark:marker:text-zinc-300">
								<li>Content should not contain offensive material.</li>
								<li>Do not upload copyrighted material (eg. SEAB papers, scans of textbooks).</li>
							</ul>
						</div>

						<div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-md">
							<Text className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
								<span className="font-semibold">Note:</span> All uploaded materials are subject to
								moderation. Content that violates these guidelines may be rejected.
							</Text>
						</div>
					</div>

					<div className="flex justify-end pt-4">
						<Button onClick={() => setIsOpen(false)} variant="solid">
							Close
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
