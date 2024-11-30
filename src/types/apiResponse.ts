export interface ApiResponseType<T> {
    code: number;
    status: string;
    message: string;
    data: T;
}
