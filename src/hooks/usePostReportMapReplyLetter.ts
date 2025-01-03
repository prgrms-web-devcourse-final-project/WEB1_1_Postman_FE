import { PostReportKeywordLetterResponseType } from './../types/report';
import { ApiResponseType } from './../types/apiResponse';
import { postReportMapReplyLetter } from './../service/Report/postReportMapReplyLetter';
import { useMutation } from '@tanstack/react-query';

export const usePostReportMapReplyLetter = (
    replyLetterId: number,
    description: string
) => {
    return useMutation<
        ApiResponseType<PostReportKeywordLetterResponseType>,
        Error,
        void
    >({
        mutationFn: async () => {
            return await postReportMapReplyLetter({
                replyLetterId,
                description
            });
        }
    });
};
