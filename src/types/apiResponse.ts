export interface ApiResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T;
}
