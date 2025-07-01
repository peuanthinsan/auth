import axios from 'axios';

const apiBase = process.env.API_URL || '/api';
export const API_ROOT = apiBase.replace(/\/api\/?$/, '');

const api = axios.create({
  baseURL: apiBase
});

const cache = {};

export async function getCached(url, config = {}) {
  const key = url + JSON.stringify(config.params || {});
  if (cache[key]) {
    return { data: cache[key] };
  }
  const res = await api.get(url, config);
  cache[key] = res.data;
  return res;
}

export function clearCache(prefix) {
  Object.keys(cache).forEach(k => {
    if (k.startsWith(prefix)) delete cache[k];
  });
}

let refreshTokenValue = '';
let tokenRefreshHandler = null;

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export function setRefreshToken(token) {
  refreshTokenValue = token;
}

export function setTokenRefreshHandler(handler) {
  tokenRefreshHandler = handler;
}

api.interceptors.response.use(
  res => res,
  async error => {
    if (
      error.config &&
      error.response &&
      error.response.status === 401 &&
      refreshTokenValue &&
      !error.config.__isRetryRequest &&
      !error.config.url.includes('/login') &&
      !error.config.url.includes('/refresh')
    ) {
      error.config.__isRetryRequest = true;
      try {
        const res = await api.post('/refresh', { refreshToken: refreshTokenValue });
        const newToken = res.data.token;
        if (tokenRefreshHandler) tokenRefreshHandler(newToken);
        setAuthToken(newToken);
        return api.request(error.config);
      } catch (err) {
        // ignore
      }
    }
    return Promise.reject(error);
  }
);

export default api;
