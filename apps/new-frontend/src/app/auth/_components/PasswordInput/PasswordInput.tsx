"use client";

import { Input, type InputProps, IconButton } from "@shared/ui/components";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function PasswordInput(props: InputProps) {
	const [visible, setVisible] = useState(false);

	return (
		<Input
			{...props}
			type={visible ? "text" : "password"}
			icon={
				<IconButton
					type="button"
					onClick={() => setVisible((v) => !v)}
					aria-label={visible ? "Hide password" : "Show password"}
					size="sm"
					className="pointer-events-auto"
				>
					{visible ? (
						<EyeSlashIcon className="size-5 stroke-gray-500 dark:stroke-gray-400" />
					) : (
						<EyeIcon className="size-5 stroke-gray-500 dark:stroke-gray-400" />
					)}
				</IconButton>
			}
		/>
	);
}
