import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteKeywordLetterReplyKeywordLetter } from '@/service/detail/deleteKeywordLetter';

type UseDeleteKeywordLetterReplyKeywordLetterProps = {
    letterId: number;
    boxType: string;
};

export const useDeleteKeywordLetterReplyKeywordLetter = (
    { letterId, boxType }: UseDeleteKeywordLetterReplyKeywordLetterProps,
    options?: UseMutationOptions<string, Error, void>
) => {
    return useMutation<string, Error, void>({
        mutationFn: async () => {
            const response = await deleteKeywordLetterReplyKeywordLetter({
                letterId,
                boxType
            });
            return response.result;
        },
        ...options
    });
};
