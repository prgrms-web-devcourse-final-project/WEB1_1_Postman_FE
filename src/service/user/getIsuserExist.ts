import { defaultApi } from '@/service/api';

interface CheckUserExistsResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        isExists: boolean;
    };
}

export const getIsuserExist = async (
    nickname: string
): Promise<CheckUserExistsResponse> => {
    const api = defaultApi();

    const response = await api.get(`/user/exists?nickname=${nickname}`);
    return response.data;
};
