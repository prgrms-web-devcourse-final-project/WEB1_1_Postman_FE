import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { PostReportKeywordLetterResponseType } from '@/types/report';

type postReportMapReplyLetterRequestProps = {
    replyLetterId: number;
    description: string;
};

type postMapKeywordLetterResponse =
    ApiResponseType<PostReportKeywordLetterResponseType>;

export async function postReportMapReplyLetter({
    replyLetterId,
    description
}: postReportMapReplyLetterRequestProps): Promise<postMapKeywordLetterResponse> {
    const api = defaultApi();
    const response = await api.post<postMapKeywordLetterResponse>(
        `/map/reply/${replyLetterId}/complaint`,
        {
            data: {
                description
            }
        }
    );
    return response.data;
}
