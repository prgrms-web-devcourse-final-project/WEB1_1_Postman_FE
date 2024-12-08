import { AxiosError } from 'axios';
import { defaultApi } from '@/service/api';
import { VerifyEmailProps, VerifyEmailResponse } from '@/types/register';

export async function verifyEmail({
    email,
    code
}: VerifyEmailProps): Promise<VerifyEmailResponse> {
    const api = defaultApi();
    try {
        const response = await api.post('/user/email/verify', {
            email,
            code
        });
        return response.data;
    } catch (error) {
        console.error('이메일 인증 확인 에러:', error);
        if (error instanceof AxiosError && error.response?.data) {
            throw error.response.data;
        }
        throw {
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: '서버와의 통신에 실패했습니다.'
        };
    }
}
