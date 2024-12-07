import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type refreshAccessTokenResultType = {
    newAccessToken: string;
};

type refreshAccessTokenResponse = ApiResponseType<refreshAccessTokenResultType>;

/**
 * accessToken이 만료된 경우 실행
 * refresh 토큰이 유효할 경우 새 accessToken을 발급 isSuccess : true
 * refresh 토큰이 유효하지 않을 경우 isSuccess : false
 */
export async function refreshAccessToken(): Promise<refreshAccessTokenResponse> {
    const api = defaultApi();
    const response = await api.post('/auth/validate');
    console.log('리프레시 토큰 유효성 검사:', response);
    return response.data;
}
