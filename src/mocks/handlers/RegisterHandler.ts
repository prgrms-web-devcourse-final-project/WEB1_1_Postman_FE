import { ApiResponseType } from '@/types/apiResponse';
import { http, HttpResponse } from 'msw';

type SendEmailRequestBody = {
    email: string;
};

type VerifyEmailRequestBody = {
    email: string;
    authNum: string;
};

type DuplicateCheckRequestBody = {
    nickname: string;
};

type registerRequestBody = {
    email: string;
    password: string;
    authNum: string;
};

type IsDuplicated = {
    isDuplicated: boolean;
};

type CommonResponseBody = ApiResponseType<'success' | null>;
type DuplicateCheckResponseBody = ApiResponseType<IsDuplicated | null>;

type registerResponseBody = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
};

export const RegisterHandler = [
    // 이메일 인증번호 전송
    http.post<
        never,
        SendEmailRequestBody,
        CommonResponseBody,
        '*/auth/email/send-email'
    >('*/auth/email/send-email', async ({ request }) => {
        const { email } = await request.json();

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
        VerifyEmailRequestBody,
        CommonResponseBody,
        '*/auth/email/verify'
    >('*/auth/email/verify', async ({ request }) => {
        const { authNum } = await request.json();

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

        // 올바르지 않은 인증코드
        if (authNum === 'error0') {
            return HttpResponse.json(
                {
                    code: 400,
                    status: 'BAD_REQUEST',
                    message: '잘못된 인증코드입니다.',
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
                message: '이메일 인증에 실패하였습니다.',
                data: null
            },
            {
                status: 500
            }
        );
    }),

    // 닉네임 중복 체크
    http.post<
        never,
        DuplicateCheckRequestBody,
        DuplicateCheckResponseBody,
        '*/auth/duplicate-check/nickname'
    >('*/auth/duplicate-check/nickname', async ({ request }) => {
        const { nickname } = await request.json();

        // 인증번호 요청 성공
        if (nickname === '가능') {
            return HttpResponse.json(
                {
                    code: 200,
                    status: 'OK',
                    message: '닉네임 사용 가능',
                    data: {
                        isDuplicated: false
                    }
                },
                {
                    status: 200
                }
            );
        }

        if (nickname === '불가능') {
            return HttpResponse.json(
                {
                    code: 400,
                    status: '',
                    message: '닉네임 중복',
                    data: {
                        isDuplicated: true
                    }
                },
                {
                    status: 400
                }
            );
        }

        if (nickname === 'error') {
            return HttpResponse.json(
                {
                    code: 400,
                    status: '',
                    message: '올바르지 않은 닉네임 형태',
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
                message: '닉네임 중복 체크에 실패하였습니다.',
                data: null
            },
            {
                status: 500
            }
        );
    }),

    http.post<
        never,
        registerRequestBody,
        registerResponseBody,
        '*/auth/signup'
    >('*/auth/signup', async ({ request }) => {
        const { email } = await request.json();

        // 인증번호 요청 성공
        if (email === 'success@email.com') {
            return HttpResponse.json(
                {
                    isSuccess: true,
                    code: 'COMMON201',
                    message: '생성에 성공했습니다.',
                    result: '회원가입 성공'
                },
                {
                    status: 200
                }
            );
        }
    })
];
