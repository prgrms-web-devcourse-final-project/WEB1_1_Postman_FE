import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type DeleteLetterType = {
    letterId: number;
};

type deleteMapLettersResponse = ApiResponseType<string>;

export const deleteMapLetters = async (
    selectedList: DeleteLetterType[]
): Promise<deleteMapLettersResponse> => {
    const api = defaultApi();
    const response = await api.delete('/map', {
        data: selectedList
    });
    return response.data;
};
