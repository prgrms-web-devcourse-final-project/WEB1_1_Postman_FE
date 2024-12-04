import { ApiResponseType } from './apiResponse';

export type LoginProps = {
    email: string;
    password: string;
};

export type TokenType = {
    accessToken: string;
    refreshToken: string;
};

export type LoginResponseType = ApiResponseType<TokenType | null>;
