export const isTokenExpired = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return true;

  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const expirationTime = decodedPayload.exp * 1000;
    return Date.now() > expirationTime;
  } catch (error) {
    return true;
  }
};
