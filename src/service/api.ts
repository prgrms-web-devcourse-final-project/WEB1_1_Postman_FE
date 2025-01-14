import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';
import { tokenStorage } from './auth/tokenStorage';
import { refreshAccessToken } from '@/service/auth/refreshAccessToken';
import { logout } from './auth/logout';
import { formatApiError } from '@/util/formatApiError';

interface QueueItem {
    resolve: (token: string) => void;
    reject: (error: QueueError) => void;
}

type QueueError = AxiosError | Error;

const baseUrl = import.meta.env.VITE_API_URL as string;

let isRefreshing = false;
let requestQueue: QueueItem[] = [];
const processQueue = (error: QueueError | null, token: string | null): void => {
    requestQueue.forEach((promise: QueueItem) => {
        if (error) {
            promise.reject(error);
        } else if (token) {
            promise.resolve(token);
        }
    });
    requestQueue = [];
};

export const defaultApi = (option?: AxiosRequestConfig): AxiosInstance => {
    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        ...option
    });

    // 요청 인터셉터
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

    // 응답 인터셉터
    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                // 갱신 중
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        requestQueue.push({
                            resolve: (token: string) => {
                                originalRequest.headers['Authorization'] =
                                    `Bearer ${token}`;
                                resolve(instance(originalRequest));
                            },
                            reject
                        });
                    });
                }

                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    const response = await refreshAccessToken();

                    if (response.isSuccess && response.result.newAccessToken) {
                        const newAccessToken = response.result.newAccessToken;
                        tokenStorage.setAccessToken(newAccessToken);

                        originalRequest.headers['Authorization'] =
                            `Bearer ${newAccessToken}`;

                        processQueue(null, newAccessToken);
                        return instance(originalRequest);
                    }
                    logout();
                    window.location.href = '/login';
                    return Promise.reject(error);
                } catch (error) {
                    processQueue(
                        new Error('로그인 토큰이 만료되었습니다.'),
                        null
                    );
                    logout();
                    window.location.href = '/login';
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            }
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            if (response.data.isSuccess === false) {
                throw formatApiError(response.data.code, response.data.message);
            }
            return response;
        },
        (error) => {
            if (error.response?.data) {
                throw formatApiError(
                    error.response.data.code,
                    error.response.data.message
                );
            } else if (!error.response) {
                throw formatApiError(
                    'NETWORK_ERROR',
                    '서버와의 통신에 실패했습니다.'
                );
            }
            throw formatApiError(
                'UNKNOWN_ERROR',
                '요청 처리 중 문제가 발생했습니다.'
            );
        }
    );

    return instance;
};
