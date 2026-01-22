import { Dialog as HeadlessDialog, DialogPanel as HeadlessDialogPanel } from "@headlessui/react";
import type { ModalProps } from "./types";

export function Modal({ children, ...props }: ModalProps) {
	return (
		<HeadlessDialog as="div" className="relative z-50 focus:outline-none" {...props}>
			<div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/40 backdrop-blur-sm">
				<div className="flex min-h-full items-center justify-center p-4">
					<HeadlessDialogPanel
						transition
						className="w-full p-6 max-w-md rounded-2xl bg-cream dark:bg-navy-deep border border-navy/10 dark:border-cream/10 shadow-xl duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
					>
						{children}
					</HeadlessDialogPanel>
				</div>
			</div>
		</HeadlessDialog>
	);
}
