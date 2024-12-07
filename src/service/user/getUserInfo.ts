import { defaultApi } from '@/service/api';
import { UserType } from '@/types/user';

type getUserInfoResponseType = UserType;

export async function getUserInfo(): Promise<getUserInfoResponseType> {
    const api = defaultApi();

    const response = await api.get('/user');
    return response.data.result;
}
