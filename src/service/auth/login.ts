import { defaultApi } from '@/service/api';
import { LoginProps, LoginResponseType } from '@/types/login';

export async function login({
    email,
    password
}: LoginProps): Promise<LoginResponseType> {
    const api = defaultApi();
    const response = await api.post('/auth/signin', { email, password });
    return response.data;
}
