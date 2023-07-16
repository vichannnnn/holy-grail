import { apiClient } from '@apiClient';

export const resendVerificationEmail = async () => {
  const response = await apiClient.post(`/auth/resend_email_verification_token`);
  return response.data;
};
