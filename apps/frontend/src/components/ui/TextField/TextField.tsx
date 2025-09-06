"use client";

import { TextField as TextFieldBase, TextFieldProps, styled } from "@mui/material";
import { forwardRef } from "react";

const CustomTextFieldStyled = styled(TextFieldBase)(({ theme }) => ({
	"& .MuiInputBase-input .MuiInputBase-inputMultiline": {
		color: "#2d2d2d",
		backgroundColor: "#e4e5f1",
		borderTopLeftRadius: "8px",
		borderBottomLeftRadius: "8px",
		borderTopRightRadius: "8px",
		borderBottomRightRadius: "8px",

		...theme.applyStyles("dark", {
			color: "#e4e5f1",
			backgroundColor: "#2d2d2d",
		}),
	},

	"& label": {
		color: "#2d2d2d",

		...theme.applyStyles("dark", {
			color: "#949494",
		}),
	},

	"& label.Mui-focused": {
		color: "#2d2d2d",

		...theme.applyStyles("dark", {
			color: "#949494",
		}),
	},

	"& .MuiOutlinedInput-root": {
		borderColor: "#333333",
		borderRadius: "8px",
		paddingRight: 0,

		"&.Mui-focused fieldset": {
			color: "#2d2d2d",
			borderColor: "#2d2d2d",
			borderWidth: "1px",

			...theme.applyStyles("dark", {
				color: "#949494",
				borderColor: "#ffffff",
			}),
		},

		"&:hover fieldset": {
			color: "#2d2d2d",
			borderColor: "#444444",
			borderWidth: "1px",

			...theme.applyStyles("dark", {
				color: "#949494",
			}),
		},

		"& .MuiOutlinedInput-notchedOutline": {
			backgroundColor: "transparent",
		},
	},

	"&.Mui-focused .MuiOutlinedInput-root.Mui-error fieldset": {
		borderColor: theme.palette.error.main,
	},

	"&.Mui-focused .MuiFormLabel-root.Mui-error": {
		color: theme.palette.error.main,
	},

	"& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
		borderColor: theme.palette.error.main,
	},

	"& .MuiFormHelperText-root": {
		fontFamily: '"Poppins", sans-serif',
		color: "#949494",
	},

	"& .MuiFormLabel-root.Mui-error": {
		fontFamily: '"Poppins", sans-serif',
		color: "red",
	},
}));

const CustomTextField = forwardRef((props: TextFieldProps, ref) => {
	const { className, ...rest } = props;
	return <CustomTextFieldStyled className={className} {...rest} inputRef={ref} />;
});

CustomTextField.displayName = "CustomTextField";

export const TextField = forwardRef((props: TextFieldProps, ref) => {
	const { className, ...rest } = props;
	return <CustomTextField fullWidth variant="outlined" className={className} {...rest} ref={ref} />;
});

TextField.displayName = "TextField";
