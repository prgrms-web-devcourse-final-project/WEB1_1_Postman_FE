import { defaultApi } from '@/service/api';
import { UserType } from '@/types/user';

type getUserInfoResponseType = UserType | null;

export async function getUserInfo(): Promise<getUserInfoResponseType> {
    const api = defaultApi();
    try {
        const response = await api.get('/user');
        console.log(response);
        return response.data.result;
    } catch (error) {
        console.error(error);
        return null;
    }
}
