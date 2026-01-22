"use client";

import { useState } from "react";
import { Modal, Title, Text, Button } from "@shared/ui/components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { UploadGuidelinesProps } from "./types";

export function UploadGuidelines({ children }: Readonly<UploadGuidelinesProps>) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="underline hover:text-amber transition-colors cursor-pointer inline"
			>
				{children}
			</button>

			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Title order={2} className="font-bold text-xl text-navy-deep dark:text-cream">
							Upload Guidelines
						</Title>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-navy/5 dark:text-cream/50 dark:hover:text-cream dark:hover:bg-cream/5 transition-colors"
							aria-label="Close"
						>
							<XMarkIcon className="size-5" />
						</button>
					</div>

					<div className="space-y-4 max-h-96 overflow-y-auto text-navy/80 dark:text-cream/80">
						<div>
							<Title order={3} className="font-semibold text-base mb-2 text-navy-deep dark:text-cream">
								File Requirements
							</Title>
							<ul className="list-disc list-inside space-y-1 text-sm">
								<li>Maximum file size: 500MB per file</li>
								<li>Supported formats: PDF, ZIP</li>
								<li>Maximum files per upload: 25</li>
							</ul>
						</div>
						<div>
							<Title order={3} className="font-semibold text-base mb-2 text-navy-deep dark:text-cream">
								Quality Guidelines
							</Title>
							<ul className="list-disc list-inside space-y-1 text-sm">
								<li>
									Try to adhere to the naming scheme: [school] [year] [chapter title/paper
									component].
								</li>
								<li>Distinguish between exam types (eg. between mid-year and prelim papers).</li>
							</ul>
						</div>

						<div>
							<Title order={3} className="font-semibold text-base mb-2 text-navy-deep dark:text-cream">
								Content Standards
							</Title>
							<ul className="list-disc list-inside space-y-1 text-sm">
								<li>Content should not contain offensive material.</li>
								<li>Do not upload copyrighted material (eg. SEAB papers, scans of textbooks).</li>
							</ul>
						</div>

						<div className="bg-amber/10 dark:bg-amber/20 p-3 rounded-lg border border-amber/20">
							<Text className="text-sm font-medium text-navy-deep dark:text-cream">
								<span className="font-semibold text-amber">Note:</span> All uploaded materials are subject to
								moderation. Content that violates these guidelines may be rejected.
							</Text>
						</div>
					</div>

					<div className="flex justify-end pt-2">
						<Button onClick={() => setIsOpen(false)} variant="solid">
							Got it
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
