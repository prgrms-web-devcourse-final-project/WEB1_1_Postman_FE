import { ApiErrorType } from './../types/apiError';

export const formatApiError = (
    code: string,
    message: string
): ApiErrorType => ({
    isSuccess: false,
    code,
    message
});
