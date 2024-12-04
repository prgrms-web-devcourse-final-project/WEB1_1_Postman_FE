export interface ApiResponseType<T> {
    code: string;
    status: string;
    message: string;
    result: T;
}
