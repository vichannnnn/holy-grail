"use client";

import { MouseEvent, useState } from "react";
import { UserMenu } from "src/components/layouts/Header";

import { Button } from "@components/Button";

import { User } from "@providers/AuthProvider";

interface UserButtonProps {
	user: User | null;
}

export const UserButton = ({ user }: UserButtonProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				id="user-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<p>{user?.username}</p>
			</Button>
			<UserMenu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "user-button",
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				user={user}
			/>
		</>
	);
};
