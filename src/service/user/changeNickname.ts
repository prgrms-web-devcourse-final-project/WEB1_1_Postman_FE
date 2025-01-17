import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type ChangeNicknameProps = {
    nickname: string;
};

type ChangeNicknameResponse = ApiResponseType<'success' | 'fail'>;

export async function changeNickname({
    nickname
}: ChangeNicknameProps): Promise<ChangeNicknameResponse> {
    const api = defaultApi();
    const response = await api.patch('/user/nickname', { nickname });
    return response.data;
}
