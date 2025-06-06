export enum DataTypeEnum {
  CATEGORY = 'category',
  SUBJECT = 'subject',
  TYPE = 'type',
  USER = 'user',
}

export enum RoleEnum {
  USER = 1,
  ADMIN = 2,
  DEVELOPER = 3,
}

export const RoleEnumMapping: Record<number, string> = {
  [RoleEnum.USER]: 'User',
  [RoleEnum.ADMIN]: 'Admin',
  [RoleEnum.DEVELOPER]: 'Developer',
};

export interface AddTypeDetails {
  name: string;
}

export interface AddSubjectDetails extends AddTypeDetails {
  category_id: number;
}

export interface UpdateTypeDetails {
  name: string;
}

export interface UpdateSubjectDetails extends UpdateTypeDetails {
  category_id: number;
}

export interface UpdateUserDetails {
  role: RoleEnum;
}
