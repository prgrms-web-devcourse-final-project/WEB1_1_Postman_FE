import { defaultApi } from '@/service/api';

type GetAllKeywordType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        categories: {
            category: string;
            keywords: string[];
        }[];
    };
};

export const getAllKeyword = async (): Promise<GetAllKeywordType> => {
    const api = defaultApi();

    const response = await api.get('/keywords/list');
    return response.data;
};
