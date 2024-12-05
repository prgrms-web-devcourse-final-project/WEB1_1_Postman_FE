import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type Letter = {
    letterId: number;
    title: string;
    label: string;
    letterType: string;
    boxType: string;
    createdAt: string;
};

type getLetterProps = {
    apiEndpoint: string;
    page?: number;
    size?: number;
    sort?: string;
};

type getLetterResultType = {
    content: Letter[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};

type getLetterResponse = ApiResponseType<getLetterResultType>;

export async function getLetter({
    apiEndpoint,
    page,
    size
}: getLetterProps): Promise<getLetterResponse> {
    const api = defaultApi();
    const response = await api.get(apiEndpoint, {
        params: {
            page: page,
            size: size
        }
    });
    return response.data;
}
