import { Alert, Snackbar } from "@mui/material";

interface AlertToastProps {
	openAlert: boolean;
	onClose: () => void;
	alertContent?: AlertProps;
}

export interface AlertProps {
	title?: string;
	description: string;
	severity: "success" | "error" | "warning" | "info";
}

export const AlertToast = ({ openAlert, onClose, alertContent }: AlertToastProps) => {
	if (!alertContent) {
		return null;
	}
	return (
		<Snackbar
			open={openAlert}
			autoHideDuration={3000}
			onClose={onClose}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			<Alert severity={alertContent.severity} sx={{ width: "100%" }}>
				{alertContent.title && <p className="font-bold">{alertContent.title}</p>}
				<p>{alertContent.description}</p>
			</Alert>
		</Snackbar>
	);
};
