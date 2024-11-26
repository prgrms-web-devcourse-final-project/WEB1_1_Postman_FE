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
