import { ApiResponse } from '@/types/apiResponse';
import { http, HttpResponse } from 'msw';

type SendEmailRequestBody = {
    email: string;
};

type SendEmailResponse = ApiResponse<'success' | 'fail'>;

export const LoginHandler = [
    http.post<
        never,
        SendEmailRequestBody,
        SendEmailResponse,
        '*/auth/email/send-email'
    >('*/auth/email/send-email', async ({ request }) => {
        const { email } = await request.json();
        console.log(email);

        // 인증번호 요청 성공
        if (email === 'success@email.com') {
            return HttpResponse.json({
                code: 200,
                status: 'OK',
                message: '이메일 인증 요청 성공',
                data: 'success'
            });
        }

        // 올바르지 않은 이메일 형태
        if (email === 'error@email.com') {
            return HttpResponse.json({
                code: 400,
                status: 'BAD_REQUEST',
                message: '올바르지 않은 이메일 형태입니다.',
                data: 'fail'
            });
        }
    })
];
