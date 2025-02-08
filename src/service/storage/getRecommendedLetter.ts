import { defaultApi } from '@/service/api';

type GetRecommendedLetterType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        letterId: number;
        title: string;
        label: string;
    }[];
};

export const getRecommendedLetter =
    async (): Promise<GetRecommendedLetterType> => {
        const api = defaultApi();
        const response = await api.get('/letters/recommend');
        return response.data;
    };
