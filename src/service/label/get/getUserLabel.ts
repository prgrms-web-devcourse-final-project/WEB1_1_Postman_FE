import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { Label } from '@/types/Label';

type GetUserLabelResponseType = ApiResponseType<Label[]>;

export const getUserLabel = async (): Promise<GetUserLabelResponseType> => {
    const api = defaultApi();

    const response = await api.get('/labels/user');
    console.log('라벨응답:', response);
    return response.data;
};
