import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';
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

    //에러처리
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error instanceof AxiosError && error.response?.data) {
                throw error.response.data;
            }
            throw {
                status: 500,
                error: 'INTERNAL_SERVER_ERROR',
                message: '서버와의 통신에 실패했습니다.'
            };
        }
    );
};
