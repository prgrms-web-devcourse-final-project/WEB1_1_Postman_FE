import { defaultApi } from '@/service/api';
import { GetRecentRelyResponseType } from '@/types/letter';

export const getRecentRely = async (): Promise<GetRecentRelyResponseType> => {
    const api = defaultApi();

    const response = await api.get('/reply');
    return response.data;
};
