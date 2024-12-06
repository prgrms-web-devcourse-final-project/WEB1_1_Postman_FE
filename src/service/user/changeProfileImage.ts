import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type ChangeProfileImageProps = {
    imageUrl: string;
};

type changeProfileImageResponse = ApiResponseType<'success' | 'fail'>;

export async function changeProfileImage(
    imageUrl: ChangeProfileImageProps
): Promise<changeProfileImageResponse> {
    const api = defaultApi();
    const response = await api.patch('/user/profileImg', {
        imageUrl: imageUrl
    });
    return response.data;
}
