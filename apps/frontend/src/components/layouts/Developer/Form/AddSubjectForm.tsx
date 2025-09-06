import { yupResolver } from "@hookform/resolvers/yup";
import { AddSubjectDetails } from "@layouts/Developer";
import { TextField } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { CategoryType, fetchLibraryTypes } from "@api/library";

import { Combobox } from "@components/Combobox";

import { DeveloperAddSubjectValidation } from "@utils/forms";

interface AddSubjectFormProps {
	onSubmit: SubmitHandler<AddSubjectDetails>;
}

export const AddSubjectForm = forwardRef<HTMLFormElement, AddSubjectFormProps>(
	({ onSubmit }, ref) => {
		const [categoryData, setCategoryData] = useState<CategoryType[]>([]);

		const {
			register,
			control,
			handleSubmit,
			formState: { errors },
		} = useForm<AddSubjectDetails>({
			resolver: yupResolver(DeveloperAddSubjectValidation),
		});

		useEffect(() => {
			fetchLibraryTypes().then(({ categories }) => {
				setCategoryData(categories);
			});
		}, []);

		return (
			<form
				onSubmit={handleSubmit(onSubmit)}
				ref={ref}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "12px",
					justifyContent: "center",
				}}
			>
				<Controller
					name="category_id"
					control={control}
					render={({ field }) => (
						<Combobox
							label="Select a category"
							options={categoryData}
							onChange={(newValue) => field.onChange(newValue)}
							value={field.value}
							error={Boolean(errors && errors.category_id)}
							helperText={errors && errors.category_id ? errors.category_id.message : ""}
							fullWidth
						/>
					)}
				/>
				<TextField
					{...register("name", { required: true })}
					autoFocus
					margin="dense"
					label={<span style={{ textTransform: "capitalize" }}>Subject</span>}
					type="text"
					error={Boolean(errors && errors.name)}
					helperText={errors && errors.name ? errors.name.message : ""}
				/>
			</form>
		);
	},
);

AddSubjectForm.displayName = "AddSubjectForm";
