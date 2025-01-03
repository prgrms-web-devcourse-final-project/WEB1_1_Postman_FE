import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type ChangePasswordProps = {
    existingPassword: string;
    newPassword: string;
};

type ChangeNicknameResponse = ApiResponseType<string>;

export async function changePassword({
    existingPassword,
    newPassword
}: ChangePasswordProps): Promise<ChangeNicknameResponse> {
    const api = defaultApi();
    const response = await api.patch('/user/password', {
        existingPassword,
        newPassword
    });
    return response.data;
}
