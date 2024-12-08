import { postReportKeywordReplyLetter } from '@/service/Report/postReportKeywordReplyLetter';
import { ApiResponseType } from '@/types/apiResponse';
import { PostReportKeywordLetterResponseType } from '@/types/report';
import { useMutation } from '@tanstack/react-query';

export const usePostReportKeywordReplyLetter = (
    replyLetterId: number,
    description: string
) => {
    return useMutation<
        ApiResponseType<PostReportKeywordLetterResponseType>,
        Error,
        void
    >({
        mutationFn: async () => {
            return await postReportKeywordReplyLetter({
                replyLetterId,
                description
            });
        }
    });
};
