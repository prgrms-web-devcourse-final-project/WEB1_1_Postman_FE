import { AxiosError } from 'axios';
import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type ChangeProfileImageProps = {
    changeImg: string;
};

type changeProfileImageResponse = ApiResponseType<'success' | 'fail'>;

export async function changeProfileImage({
    changeImg
}: ChangeProfileImageProps): Promise<changeProfileImageResponse> {
    const api = defaultApi();
    try {
        const response = await api.patch('/user/profileImg', {
            changeImg
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data) {
            throw error.response.data;
        }
        throw {
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: '서버와의 통신에 실패했습니다.'
        };
    }
}
