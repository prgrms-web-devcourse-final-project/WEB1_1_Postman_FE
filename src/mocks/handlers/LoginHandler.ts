import { http, HttpResponse } from 'msw';
import { UserType } from '@/types/user';

type LoginRequestBody = {
    email: string;
    password: string;
};

type LoginResponseBody = {
    code: number;
    status: string;
    message: string;
    data: string | UserType;
};

export const LoginHandler = [
    http.post<never, LoginRequestBody, LoginResponseBody, '*/auth/signin'>(
        '*/auth/signin',
        async ({ request }) => {
            const { email } = await request.json();
            console.log(email);
            // 로그인 성공
            if (email === 'success@email.com') {
                return HttpResponse.json(
                    {
                        code: 200,
                        status: 'OK',
                        message: '로그인 성공',
                        data: {
                            email: email,
                            nickname: '테스트유저',
                            profileImageUrl: 'sample.jpg'
                        }
                    },
                    {
                        status: 200
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Set-Cookie':
                                'accessToken=test-token123; Path=/; HttpOnly'
                        }
                    }
                );
            }

            // 존재하지 않는 유저
            if (email === 'notfound@email.com') {
                return HttpResponse.json(
                    {
                        code: 400,
                        status: 'USER_NOT_FOUND',
                        message: '존재하지 않는 유저',
                        data: null
                    },
                    {
                        status: 400
                    }
                );
            }

            // 오류
            if (email === 'error@email.com') {
                return HttpResponse.json(
                    {
                        code: 500,
                        status: 'INTERNER_SERVER_ERROR',
                        message: '로그인 실패',
                        data: null
                    },
                    {
                        status: 500
                    }
                );
            }

            // 기본 에러
            return HttpResponse.json(
                {
                    code: 400,
                    status: 'BAD_REQUEST',
                    message: '잘못된 요청입니다',
                    data: null
                },
                {
                    status: 400
                }
            );
        }
    )
];
