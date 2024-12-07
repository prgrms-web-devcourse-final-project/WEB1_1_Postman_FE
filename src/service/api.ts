import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { tokenStorage } from './auth/tokenStorage';
import { refreshAccessToken } from '@/service/auth/refreshAccessToken';
import { logout } from './auth/logout';
import { formatApiError } from '@/util/formatApiError';

const baseUrl = import.meta.env.VITE_API_URL as string;

// let isRefreshing = false;
// let failedQueue: Array<{
//     resolve: (value?: unknown) => void;
//     reject: (reason?: any) => void;
// }> = [];

//TODO - 대기중인 요청 처리 함수 구현
// . . .

export const defaultApi = (option?: AxiosRequestConfig): AxiosInstance => {
    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        retry: false,
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
            const originalRequest = error.config;

            if (!originalRequest) {
                return Promise.reject(error);
            }

            // 액세스토큰 에러가 아니거나, 이미 재시도된 요청일 경우
            if (error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject(error);
            }

            originalRequest.retry = true;

            try {
                const refreshAccessTokenResponse = await refreshAccessToken();

                if (refreshAccessTokenResponse.isSuccess) {
                    console.log('액세스 토큰 재발급됨');
                    const newAccessToken =
                        refreshAccessTokenResponse.result!.newAccessToken;
                    tokenStorage.setAccessToken(newAccessToken);
                    // 실패했던 요청을 재요청
                    originalRequest.headers['Authorization'] =
                        `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                }
                console.log('로그아웃');
                logout();
                // window.location.href = '/login';
            } catch (error) {
                logout();
                window.location.href = '/login';
                return Promise.reject(error);
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
            throw formatApiError('ERROR500', '네트워크 요청에 실패했습니다.');
        }
    );

    return instance;
};
