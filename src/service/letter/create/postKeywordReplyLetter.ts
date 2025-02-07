import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { CreateKeywordReplyLetterResponseType } from '@/types/letter';

type PostKeywordReplyLetterRequestProps = {
    letterId: number;
    content: string;
    font: string;
    paper: string;
    label: string;
};

type PostKeywordReplyLetterResponse =
    ApiResponseType<CreateKeywordReplyLetterResponseType>;

export async function postKeywordReplyLetter({
    letterId,
    content,
    font,
    paper,
    label
}: PostKeywordReplyLetterRequestProps): Promise<PostKeywordReplyLetterResponse> {
    const api = defaultApi();
    const response = await api.post<PostKeywordReplyLetterResponse>(
        `/letters/replies/${letterId}`,
        { content, font, paper, label }
    );
    return response.data;
}
