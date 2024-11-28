import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const baseUrl = import.meta.env.VITE_API_URL as string;

export const defaultApi = (option?: AxiosRequestConfig): AxiosInstance => {
    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        ...option
    });
    return instance;
};
