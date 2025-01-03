import { defaultApi } from '@/service/api';

type CraeteUserKeywordType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
};

export const createUserKeyword = async (
    keywords: string[]
): Promise<CraeteUserKeywordType> => {
    const api = defaultApi();

    const response = await api.post('/keywords', { keywords });
    return response.data;
};
