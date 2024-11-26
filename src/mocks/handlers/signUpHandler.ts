import { http, HttpResponse } from 'msw';

type AuthCode =
    | 'AUTH201' // 성공
    | 'AUTH4000' // 이메일 중복
    | 'AUTH4001' // 올바르지 않은 이메일 형태
    | 'AUTH4002' // 올바르지 않은 닉네임 형태
    | 'AUTH4003' // 닉네임 중복
    | 'AUTH5000'; // 회원가입 실패 (서버 에러)

type SignUpRequestBody = {
    email: string;
    password: string;
    nickname: string;
};

type AuthResponseBody = {
    code: AuthCode;
    status: number | string;
    message: string;
    data: null | string;
};

export const signUpHandler = http.post<
    never,
    SignUpRequestBody,
    AuthResponseBody,
    '/auth/sign'
>('/auth/sign', async ({ request }) => {
    const requestData: SignUpRequestBody = await request.json();
    const { email, nickname } = requestData;

    // 500 - AUTH5000 회원가입 실패
    if (email === 'error@test.com') {
        return HttpResponse.json({
            code: 'AUTH5000',
            status: 500,
            message: '회원가입 실패',
            data: null
        });
    }

    // 400 - AUTH4000 이메일 중복
    if (email === 'existing@email.com') {
        return HttpResponse.json({
            code: 'AUTH4000',
            status: 400,
            message: '이메일 중복',
            data: null
        });
    }

    // 400 - AUTH4001 올바르지 않은 이메일 형태
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return HttpResponse.json({
            code: 'AUTH4001',
            status: 400,
            message: '올바르지 않은 이메일 형태',
            data: null
        });
    }

    // 400 - AUTH4002 올바르지 않은 닉네임 형태
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    if (!nicknameRegex.test(nickname)) {
        return HttpResponse.json({
            code: 'AUTH4002',
            status: 400,
            message: '올바르지 않은 닉네임 형태',
            data: null
        });
    }

    // 400 - AUTH4003 닉네임 중복
    if (nickname === 'existingNickname') {
        return HttpResponse.json({
            code: 'AUTH4003',
            status: 400,
            message: '닉네임 중복',
            data: null
        });
    }

    // 201 - CREATED 회원가입 성공
    return HttpResponse.json(
        {
            code: 'AUTH201',
            status: 'CREATED',
            message: '회원가입 성공',
            data: 'success'
        },
        { status: 201 }
    );
});
