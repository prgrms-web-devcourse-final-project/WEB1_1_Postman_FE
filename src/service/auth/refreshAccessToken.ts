import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type refreshAccessTokenResultType = {
    newAccessToken: string;
};

type refreshAccessTokenResponse =
    ApiResponseType<refreshAccessTokenResultType | null>;

/**
 * accessToken이 만료된 경우 갱신을 요청합니다
 */
export async function refreshAccessToken(): Promise<refreshAccessTokenResponse> {
    const api = defaultApi();
    const response = await api.post('/auth/validate');
    console.log('액세스 토큰 갱신됨.');
    return response.data;
}
