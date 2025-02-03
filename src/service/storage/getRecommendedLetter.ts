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
        console.log('401에러 디버깅 getRecommendedLetter 출력:', response.data);
        return response.data;
    };
