import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type DeleteLetterType = {
    letterIds: number[];
};

type deleteBookmarkLettersResponse = ApiResponseType<string>;

export const deleteBookmarkLetters = async (
    selectedList: DeleteLetterType
): Promise<deleteBookmarkLettersResponse> => {
    const api = defaultApi();
    const response = await api.delete('/map/archived', {
        data: selectedList
    });
    return response.data;
};
