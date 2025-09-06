"use client";

import {
	AddPropertiesForm,
	AddSubjectDetails,
	AddSubjectForm,
	AddTypeDetails,
	DataTypeEnum,
} from "@layouts/Developer";
import { useRef, useState } from "react";

import { createCategory, createDocumentType, createSubject } from "@api/actions";

import { Button } from "@components/Button";
import { Modal } from "@components/Modal";
import { AlertProps, AlertToast } from "@components/Toast";

interface AddPropertiesModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccessfulAdd: () => void;
	type: DataTypeEnum;
}

export const AddPropertiesModal = ({
	isOpen,
	onClose,
	onSuccessfulAdd,
	type,
}: AddPropertiesModalProps) => {
	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
	const formRef = useRef<HTMLFormElement>(null);

	const handleAddProperties = async (formData: AddTypeDetails) => {
		if (type !== null) {
			try {
				if (type === DataTypeEnum.CATEGORY) {
					await createCategory(formData);
				} else if (type === DataTypeEnum.TYPE) {
					await createDocumentType(formData);
				}

				onSuccessfulAdd();
				onClose();
			} catch (err) {
				setAlertContent({
					severity: "error",
					title: `Failed to add ${type}`,
					description: `The name of the ${type} already exists.`,
				});
				setOpenAlert(true);
			}
		}
	};

	const handleAddSubject = async (formData: AddSubjectDetails) => {
		try {
			await createSubject(formData);
			onSuccessfulAdd();
			onClose();
		} catch (err) {
			setAlertContent({
				severity: "error",
				title: "Failed to add subject",
				description: "A subject with the category and name already exists.",
			});
			setOpenAlert(true);
		}
	};

	const handleConfirmButtonClick = () => {
		if (formRef.current) {
			formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
		}
	};

	return (
		<>
			<Modal open={isOpen} onClose={onClose}>
				<>
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Add {type}</h2>
						<p className="text-gray-600">Please enter the name of the {type}.</p>
						<div className="flex flex-col space-y-4">
							{type === DataTypeEnum.CATEGORY || type === DataTypeEnum.TYPE ? (
								<AddPropertiesForm ref={formRef} onSubmit={handleAddProperties} type={type} />
							) : null}
							{type === DataTypeEnum.SUBJECT ? (
								<AddSubjectForm ref={formRef} onSubmit={handleAddSubject} />
							) : null}
						</div>
					</div>
					<Button
						type="submit"
						onClick={handleConfirmButtonClick}
						className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
					>
						Add
					</Button>
				</>
			</Modal>
			<AlertToast
				openAlert={openAlert}
				onClose={() => setOpenAlert(false)}
				alertContent={alertContent}
			/>
		</>
	);
};
