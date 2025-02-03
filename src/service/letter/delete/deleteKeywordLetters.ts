import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type DeleteLetterType = {
    letterId: number;
    letterType: string;
    boxType: string;
};

type deleteKeywordLettersResponse = ApiResponseType<string>;

export const deleteKeywordLetters = async (
    selectedList: DeleteLetterType[]
): Promise<deleteKeywordLettersResponse> => {
    const api = defaultApi();
    const response = await api.delete('/letters/saved', {
        data: selectedList
    });
    return response.data;
};
