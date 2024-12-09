import { LetterType, CreateLetterResponseType } from '@/types/letter';
import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type DeleteLetterType = {
    letterId: number;
    letterType: string;
    boxType: string;
};

type deleteLettersResponse = ApiResponseType<string>;

export const deleteLetters = async (
    selectedList: DeleteLetterType[]
): Promise<deleteLettersResponse> => {
    const api = defaultApi();
    const response = await api.delete('/letters/saved', {
        data: selectedList
    });
    return response.data;
};
