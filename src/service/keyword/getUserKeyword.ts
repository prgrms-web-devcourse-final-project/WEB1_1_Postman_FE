import { defaultApi } from '@/service/api';

type GetUserKeywordType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        keywords: string[];
    };
};

export const getUserKeyword = async (): Promise<GetUserKeywordType> => {
    const api = defaultApi();

    const response = await api.get('/keywords');
    return response.data;
};
