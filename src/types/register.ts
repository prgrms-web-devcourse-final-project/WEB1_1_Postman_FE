import { ApiResponseType } from './apiResponse';

export type SendEmailProps = {
    email: string;
};

export type SendEmailResponse = ApiResponseType<string>;

export type VerifyEmailProps = {
    email: string;
    authNum: string;
};

export type VerifyEmailResponse = ApiResponseType<null>;

export type checkNicknameProps = {
    nickname: string;
};

export type checkNicknameResponseDataType = {
    isDuplicated: boolean;
};

export type checkNicknameResponse =
    ApiResponseType<checkNicknameResponseDataType>;
