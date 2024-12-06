import axios from 'axios';
import { ApiResponseType } from '@/types/apiResponse';

const baseUrl = import.meta.env.VITE_API_URL as string;

type refreshAccessTokenResultType = {
    newAccessToken: string;
};

type refreshAccessTokenResponse =
    ApiResponseType<refreshAccessTokenResultType | null>;

/**
 * accessToken이 만료된 경우 실행
 * refresh 토큰이 유효할 경우 새 accessToken을 발급 isSuccess : true
 * refresh 토큰이 유효하지 않을 경우 isSuccess : false
 */
export async function refreshAccessToken(): Promise<refreshAccessTokenResponse> {
    const api = axios.create({
        baseURL: baseUrl,
        withCredentials: true
    });
    const response = await api.post('/auth/validate');
    console.log('리프레시 토큰 유효성 검사:', response);
    return response.data;
}
