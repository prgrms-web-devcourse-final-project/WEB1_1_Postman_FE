import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { tokenStorage } from './auth/tokenStorage';
import { refreshAccessToken } from '@/service/auth/refreshAccessToken';
import { logout } from './auth/logout';
import { formatApiError } from '@/util/formatApiError';

const baseUrl = import.meta.env.VITE_API_URL as string;

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// TODO - 대기중인 요청 처리 함수 구현
// . . .

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

    // 액세스 토큰 만료됨
    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            console.log('액세스 토큰 만료');
            console.error('왜지??:', error);

            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    originalRequest._retry = true;

                    try {
                        // 액세스토큰 재발급 완료
                        const refreshAccessTokenResponse =
                            await refreshAccessToken();

                        if (refreshAccessTokenResponse.isSuccess) {
                            console.log('액세스 토큰 재발급됨');
                            const newAccessToken =
                                refreshAccessTokenResponse.result
                                    .newAccessToken;
                            console.log(newAccessToken);
                            tokenStorage.setAccessToken(newAccessToken);

                            originalRequest.headers['Authorization'] =
                                `Bearer ${newAccessToken}`;

                            // 대기 요청에 토큰 전달
                            refreshSubscribers.forEach((callback) =>
                                callback(newAccessToken)
                            );

                            refreshSubscribers = [];
                            return instance(originalRequest);
                        }
                        // 리프레시 토큰 만료
                        logout();
                        window.location.href = '/login';
                        return Promise.reject(error);
                    } catch (error) {
                        // 네트워크 에러?
                        return Promise.reject(error);
                    } finally {
                        isRefreshing = false;
                    }
                }

                // 대기 요청
                return new Promise((resolve) => {
                    refreshSubscribers.push((token: string) => {
                        originalRequest.headers['Authorization'] =
                            `Bearer ${token}`;
                        resolve(instance(originalRequest));
                    });
                });
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
            console.error('에러:', error);
            if (error)
                throw formatApiError(
                    'ERROR500',
                    '네트워크 요청에 실패했습니다.'
                );
        }
    );

    return instance;
};
