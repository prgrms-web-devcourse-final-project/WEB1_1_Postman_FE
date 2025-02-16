import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { LabelType } from '@/types/label';

type GetUserLabelResponseType = ApiResponseType<LabelType[]>;

export const getUserLabel = async (): Promise<GetUserLabelResponseType> => {
    const api = defaultApi();
    const response = await api.get('/labels/user');
    console.log('라벨응답:', response);
    return response.data;
};
