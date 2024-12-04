import { AxiosError } from 'axios';
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
    try {
        // refreshToken 유효성 체크
        const response = await api.post('/auth/validate');
        console.log('액세스 토큰 갱신됨.');
        // 신규 accessToken 반환
        return response.result;
    } catch (error) {
        // axios error
        if (error instanceof AxiosError && error.response) {
            // refreshToken 만료 & 유효하지 않은 refreshToken
            if (error.response.code === 'USER4004') {
                console.error(error.response.message);
                throw error.response;
            }
            // 탈퇴한 유저
            else if (error.response.code === 'USER4005') {
                console.error(error.response.message);
                throw error.response;
            }
        }
        throw {
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: '서버와의 통신에 실패했습니다.'
        };
    }
}
