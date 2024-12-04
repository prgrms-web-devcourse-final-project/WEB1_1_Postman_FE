import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { tokenStorage } from './auth/tokenStorage';
import { refreshAccessToken } from '@/service/auth/refreshAccessToken';

const baseUrl = import.meta.env.VITE_API_URL as string;

export const defaultApi = (option?: AxiosRequestConfig): AxiosInstance => {
    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        ...option
    });

    instance.interceptors.request.use(
        function (config) {
            const accessToken = tokenStorage.getAccessToken();
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    // 액세스 토큰이 만료된
    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    // 액세스 토큰 갱신
                    const newAccessToken = await refreshAccessToken();
                    originalRequest.headers['Authorization'] =
                        `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                } catch (error) {
                    tokenStorage.clearTokens();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};
