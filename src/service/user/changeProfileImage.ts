import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type ChangeProfileImageProps = {
    imageUrl: string;
};

type changeProfileImageResponse = ApiResponseType<null>;

export async function changeProfileImage(
    imageUrl: ChangeProfileImageProps
): Promise<changeProfileImageResponse> {
    const api = defaultApi();
    console.log(imageUrl);
    const response = await api.patch('/user/profileImg', imageUrl);
    console.log('에러:', response);
    return response.data;
}
