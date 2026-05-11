import axios, { AxiosError, CreateAxiosDefaults } from 'axios';
import { apiNotify } from '../components/layouts/app-layout/notify-provider/api-notify/apiNotify';

let _accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  _accessToken = token;
};

declare module 'axios' {
  interface AxiosRequestConfig {
    silent?: boolean;
  }
}

export const createApiInstance = (config: CreateAxiosDefaults) => {
  const api = axios.create(config);

  api.interceptors.request.use(
    (config) => {
      for (const key in config.params) {
        if (config.params[key] === undefined) {
          delete config.params[key];
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any, any>) => {
      const code = error.response?.data?.code ?? '999999';

      if (!error.config?.silent) {
        apiNotify.error(`api_error.${code}`);
      }
      console.error(error);

      return Promise.reject(error);
    },
  );

  return api;
};

const resolveBaseURL = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL + '/api';
  if (typeof window === 'undefined') return (process.env.NEXT_PROXY_URL ?? 'http://localhost:3023') + '/api';
  return '/api';
};

const baseConfig: CreateAxiosDefaults = {
  baseURL: resolveBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const publicRequest = createApiInstance(baseConfig);

export const api = createApiInstance({ ...baseConfig, withCredentials: true });

api.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});
