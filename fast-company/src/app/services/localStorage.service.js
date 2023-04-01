const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
function getExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
const localStorageService = {
  setTokens,
  getRefreshToken,
  getAccessToken,
  getExpiresDate
};
export default localStorageService;
