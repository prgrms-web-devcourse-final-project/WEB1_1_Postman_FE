import { AxiosError } from 'axios';
import { defaultApi } from '@/service/api';
import { SendEmailProps, SendEmailResponse } from '@/types/register';

export async function sendEmail({
    email
}: SendEmailProps): Promise<SendEmailResponse> {
    const api = defaultApi();

    try {
        const response = await api.post('/user/email/send', { email });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw {
                message: '서버와의 통신에 실패했습니다',
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR'
            };
        }
        throw {
            message: '알 수 없는 오류가 발생했습니다.',
            statusCode: 500,
            code: 'UNKNOWN_ERROR'
        };
    }
}
