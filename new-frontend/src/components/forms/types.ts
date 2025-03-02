export interface FormProps {
  onSubmitSuccess: () => void;
  onSubmitFailure: (errorMessage: string | null) => void;
  formId: string;
}

export enum FormEnum {
  ACCOUNT_LOGIN_FORM_ID = 'ACCOUNT_LOGIN_FORM_ID',
  ACCOUNT_REGISTER_FORM_ID = 'ACCOUNT_REGISTER_FORM_ID',
  FORGOT_PASSWORD_FORM_ID = 'FORGOT_PASSWORD_FORM_ID',
  UPDATE_EMAIL_FORM_ID = 'UPDATE_EMAIL_FORM_ID',
  UPDATE_PASSWORD_FORM_ID = 'UPDATE_PASSWORD_FORM_ID',
}
