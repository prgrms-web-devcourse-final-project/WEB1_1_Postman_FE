import { ApiResponse } from '@/types/apiResponse';
import { http, HttpResponse } from 'msw';

type SendEmailRequestBody = {
    email: string;
};

type VerifyEmailRequsetBody = {
    email: string;
    authNum: string;
};

type CommonResponse = ApiResponse<'success' | null>;

export const RegisterHandler = [
    // 이메일 인증번호 전송
    http.post<
        never,
        SendEmailRequestBody,
        CommonResponse,
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
                data: null
            });
        }
    }),

    // 이메일 인증번호 검증
    http.post<
        never,
        VerifyEmailRequsetBody,
        CommonResponse,
        '*/auth/email/verify'
    >('*/auth/email/verify', async ({ request }) => {
        const { authNum } = await request.json();
        console.log(authNum);

        // 인증번호 요청 성공
        if (authNum === 'aa1111') {
            return HttpResponse.json(
                {
                    code: 200,
                    status: 'OK',
                    message: '이메일 인증에 성공했습니다.',
                    data: 'success'
                },
                {
                    status: 200
                }
            );
        }

        // 올바르지 않은 인증코드 형태
        if (authNum === 'error0') {
            return HttpResponse.json(
                {
                    code: 400,
                    status: 'BAD_REQUEST',
                    message: '잘못된 인증코드 형식입니다.',
                    data: null
                },
                {
                    status: 400
                }
            );
        }

        return HttpResponse.json(
            {
                code: 500,
                status: 'INTERNER_SERVER_ERROR',
                message: '잘못된 인증코드 형식입니다.',
                data: null
            },
            {
                status: 500
            }
        );
    })
];
