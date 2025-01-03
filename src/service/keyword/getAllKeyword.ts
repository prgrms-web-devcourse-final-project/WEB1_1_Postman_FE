import { GetAllKeywordType } from '@/types/keyword';
import { defaultApi } from '@/service/api';

export const getAllKeyword = async (): Promise<GetAllKeywordType> => {
    const api = defaultApi();

    const response = await api.get('/keywords/list');
    return response.data;
};
