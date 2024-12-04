export interface ApiResponseType<T> {
    code: string;
    isSuccess: string;
    message: string;
    result: T;
}
