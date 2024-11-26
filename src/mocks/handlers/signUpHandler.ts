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
    )
];
