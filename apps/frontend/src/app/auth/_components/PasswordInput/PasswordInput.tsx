"use client";

import { Input, type InputProps, IconButton } from "@shared/ui/components";
import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

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
						<EyeSlash className="size-5 text-navy/50 dark:text-cream/50" />
					) : (
						<Eye className="size-5 text-navy/50 dark:text-cream/50" />
					)}
				</IconButton>
			}
		/>
	);
}
