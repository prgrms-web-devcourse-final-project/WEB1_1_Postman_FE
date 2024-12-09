import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type KeywordsType = { keywords: string[] };

type GetUserFrequentKeywordReaponseType = ApiResponseType<KeywordsType>;

export async function getUserFrequentKeyword(): Promise<GetUserFrequentKeywordReaponseType> {
    const api = defaultApi();
    const response = await api.get('/keywords/frequent');
    return response.data;
}
