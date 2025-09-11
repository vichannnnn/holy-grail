import { z } from "zod";

export const updateEmailFormSchema = z.object({
	new_email: z.email("Invalid email address"),
});

export type UpdateEmailFormData = z.infer<typeof updateEmailFormSchema>;
