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
            console.log(originalRequest);
            if (error.response?.status === 401) {
                try {
                    originalRequest._retry = true;
                    const refreshAccessTokenResponse =
                        await refreshAccessToken();
                    // 재발급 성공
                    if (refreshAccessTokenResponse.isSuccess) {
                        const newAccessToken =
                            refreshAccessTokenResponse.result.newAccessToken;
                        console.log('액세스 토큰 재발급됨');
                        tokenStorage.setAccessToken(newAccessToken);
                        // 리퀘스트 재요청
                        return instance(originalRequest);
                    }
                    console.log('리프레시 토큰 만료');
                    logout();
                    window.location.href = '/login';
                    return Promise.reject(error);
                } catch (error) {
                    return Promise.reject(error);
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
            console.error(error);
            // 빌드 오류떠서 이렇게 뒀습니다...
            if (error)
                throw formatApiError(
                    'ERROR500',
                    '네트워크 요청에 실패했습니다.'
                );
        }
    );

    return instance;
};
