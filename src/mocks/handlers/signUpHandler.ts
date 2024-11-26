import { http, HttpResponse } from 'msw';

type SignUpRequestBody = {
    email: string;
    password: string;
    nickname: string;
};

interface AuthResponseBody<T = unknown> {
    code: number;
    status: number | string;
    message: string;
    data: T | null;
}

interface EmailRequestBody {
    email: string;
}

interface EmailVerifyRequestBody {
    email: string;
    authNum: string;
}

interface nicknameDuplicateCheckRequestBody {
    nickname: string;
}

interface DuplicateCheckResponseBody extends AuthResponseBody {
    data: {
        isDuplicated: string;
    } | null;
}

export const signUpHandler = [
    // 회원 가입 성공
    http.post<never, SignUpRequestBody, AuthResponseBody, '/auth/sign'>(
        '/auth/sign',
        async () => {
            return HttpResponse.json(
                {
                    code: 201,
                    status: 'CREATED',
                    message: '회원가입 성공',
                    data: 'success'
                },
                { status: 201 }
            );
        }
    ),

    // 이메일 중복 확인
    http.post<
        never,
        EmailRequestBody,
        DuplicateCheckResponseBody,
        '/auth/check-email'
    >('/auth/check-email', async ({ request }) => {
        const { email } = await request.json();
        const isDuplicate = email === 'existing@email.com';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 올바르지 않은 이메일 형식
        if (!emailRegex.test(email)) {
            return HttpResponse.json({
                code: 400,
                status: 'BAD_REQUEST',
                message: '올바르지 않은 이메일입니다',
                data: null
            });
        }

        // 실패
        if (isDuplicate) {
            return HttpResponse.json({
                code: 400,
                status: 'BAD_REQUEST',
                message: '이미 사용중인 이메일입니다',
                data: {
                    isDuplicated: 'true'
                }
            });
        }

        // 성공
        return HttpResponse.json({
            code: 200,
            status: 'OK',
            message: '이메일 사용 가능',
            data: {
                isDuplicated: 'false'
            }
        });
    }),

    // 이메일 인증 요청
    http.post<
        never,
        EmailRequestBody,
        AuthResponseBody,
        '/auth/email/send-email'
    >('/auth/email/send-email', async ({ request }) => {
        const { email } = await request.json();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 올바르지 않은 이메일 형식
        if (!emailRegex.test(email)) {
            return HttpResponse.json({
                code: 400,
                status: 'BAD_REQUEST',
                message: '올바르지 않은 이메일입니다',
                data: null
            });
        }

        // 이메일 인증 요청 실패
        if (email === 'sendemailerror@email.com') {
            return HttpResponse.json({
                code: 500,
                status: 'INTERNAL_SERVER_ERROR',
                message: '이메일 인증 요청 실패',
                data: null
            });
        }

        // 성공
        return HttpResponse.json({
            code: 200,
            status: 'OK',
            message: '이메일 인증 요청 성공',
            data: 'success'
        });
    })
];
