export function saveAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}
