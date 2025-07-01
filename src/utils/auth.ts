export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token')
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}