import { ApiResponseType } from '@/types/apiResponse';
import { http, HttpResponse } from 'msw';

type ProfileImgRequestBody = {
    changeImg: string;
};

type NicknameRequestBody = {
    nickname: string;
};

type CommonmResponseBody = ApiResponseType<'success' | null>;

export const userEditHandler = [
    http.patch<
        never,
        ProfileImgRequestBody,
        CommonmResponseBody,
        '*/user/profileImg'
    >('*/user/profileImg', async ({ request }) => {
        const { changeImg } = await request.json();
        if (changeImg === '프로필_샘플1') {
            return HttpResponse.json({
                code: 200,
                status: 'OK',
                message: '프로필 변경 성공',
                data: 'success'
            });
        }
        return HttpResponse.json(
            {
                code: 500,
                status: 'INTERNAL_SERCER_ERROR',
                message: '프로필 이미지 변경에 실패했습니다',
                data: null
            },
            {
                status: 500
            }
        );
    }),

    http.patch<
        never,
        NicknameRequestBody,
        CommonmResponseBody,
        '*/user/nickname'
    >('*/user/nickname', async ({ request }) => {
        const { nickname } = await request.json();
        if (nickname === '가능') {
            return HttpResponse.json({
                code: 200,
                status: 'OK',
                message: '닉네임 변경 성공',
                data: 'success'
            });
        }
        return HttpResponse.json(
            {
                code: 500,
                status: 'INTERNAL_SERCER_ERROR',
                message: '닉네임 변경에 실패했습니다',
                data: null
            },
            {
                status: 500
            }
        );
    })
];
