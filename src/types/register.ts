import { ApiResponseType } from './apiResponse';

export type SendEmailProps = {
    email: string;
};

export type SendEmailResponse = ApiResponseType<string>;

export type VerifyEmailProps = {
    email: string;
    code: string;
};

export type VerifyEmailResponse = ApiResponseType<null>;

export type CheckNicknameProps = {
    nickname: string;
};

export type CheckNicknameResponseDataType = {
    isDuplicated: boolean;
};

export type CheckNicknameResponse = ApiResponseType<null>;
