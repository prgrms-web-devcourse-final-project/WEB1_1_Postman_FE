import { defaultApi } from '@/service/api';

type GetRecentRelyType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        type: 'MAP' | 'KEYWORD';
        labelUrl: string;
        letterId: number;
    }[];
};

export const getRecentRely = async (): Promise<GetRecentRelyType> => {
    const api = defaultApi();

    const response = await api.get('/reply');
    return response.data;
};
