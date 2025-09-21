import type { User } from "@lib/auth";
import type { CategoryType, DocumentType, SubjectType } from "@/app/library/types";

export enum DataTypeEnum {
	CATEGORY = "category",
	SUBJECT = "subject",
	TYPE = "type",
	USER = "user",
}

export type DeveloperDataType = CategoryType | SubjectType | DocumentType | User;
