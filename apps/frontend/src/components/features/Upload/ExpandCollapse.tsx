import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface ExpandCollapseProps {
	expanded: boolean;
	onClick: () => void;
}

export const ExpandCollapse = ({ expanded, onClick }: ExpandCollapseProps) => {
	return (
		<div className="expand-collapse-div">
			<button
				onClick={onClick}
				style={{ border: "none", backgroundColor: "transparent", cursor: "pointer" }}
			>
				{expanded ? <ExpandLess /> : <ExpandMore />}
			</button>
		</div>
	);
};
