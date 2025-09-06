import { Dialog as HeadlessDialog, DialogPanel as HeadlessDialogPanel } from "@headlessui/react";
import type { ModalProps } from "./types";

export function Modal({ children, ...props }: ModalProps) {
	return (
		<HeadlessDialog as="div" className="relative z-10 focus:outline-none" {...props}>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-brightness-75 backdrop-blur-xs">
				<div className="flex min-h-full items-center justify-center p-4">
					<HeadlessDialogPanel
						transition
						className="w-full p-6 max-w-md rounded-md bg-zinc-100 dark:bg-zinc-900 duration-100 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
					>
						{children}
					</HeadlessDialogPanel>
				</div>
			</div>
		</HeadlessDialog>
	);
}
