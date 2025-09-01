"use client";

import { TextField as TextFieldBase, TextFieldProps, styled } from "@mui/material";
import { forwardRef } from "react";

const CustomTextFieldStyled = styled(TextFieldBase)(({ theme }) => ({
	"& .MuiInputBase-input .MuiInputBase-inputMultiline": {
		color: theme.palette.mode === "dark" ? "#e4e5f1" : "#2d2d2d",
		backgroundColor: theme.palette.mode === "dark" ? "#2d2d2d" : "#e4e5f1",
		borderTopLeftRadius: "8px",
		borderBottomLeftRadius: "8px",
		borderTopRightRadius: "8px",
		borderBottomRightRadius: "8px",
	},

	"& label": {
		color: theme.palette.mode === "dark" ? "#949494" : "#2d2d2d",
	},

	"& label.Mui-focused": {
		color: theme.palette.mode === "dark" ? "#949494" : "#2d2d2d",
	},

	"& .MuiOutlinedInput-root": {
		borderColor: "#333333",
		borderRadius: "8px",
		paddingRight: 0,

		"&.Mui-focused fieldset": {
			color: theme.palette.mode === "dark" ? "#949494" : "#2d2d2d",
			borderColor: theme.palette.mode === "dark" ? "#ffffff" : "#2d2d2d",
			borderWidth: "1px",
		},

		"&:hover fieldset": {
			color: theme.palette.mode === "dark" ? "#949494" : "#2d2d2d",
			borderColor: "#444444",
			borderWidth: "1px",
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
