import { AxiosError } from 'axios';
import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type VerifyEmailProps = {
    email: string;
    authNum: string;
};

type VerifyEmailResponse = ApiResponseType<'success' | 'fail'>;

export async function verifyEmail({
    email,
    authNum
}: VerifyEmailProps): Promise<VerifyEmailResponse> {
    const api = defaultApi();
    try {
        const response = await api.post('/auth/email/verify', {
            email,
            authNum
        });
        return response.data;
    } catch (error) {
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
