"use client";

import { createContext, ReactElement, cloneElement, useContext, useState, ReactNode } from "react";

export interface ModalProps {
	open: boolean;
	onClose: () => void;
}

interface ModalContextType {
	openModal: (content: ReactElement<ModalProps>) => void;
	closeModal: () => void;
	activeModal: ReactNode | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [activeModal, setActiveModal] = useState<ReactElement<ModalProps> | null>(null);

	const openModal = (content: ReactElement<ModalProps>) => {
		setActiveModal(content);
	};

	const closeModal = () => {
		setActiveModal(null);
	};

	return (
		<ModalContext.Provider value={{ openModal, closeModal, activeModal }}>
			{children}
			{activeModal &&
				cloneElement<ModalProps>(activeModal as ReactElement<ModalProps>, {
					open: true,
					onClose: closeModal,
				})}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};
