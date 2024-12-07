import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteKeywordLetterReplyKeywordLetter } from '@/service/detail/deleteKeywordLetterReplyKeywordLetter';

type UseDeleteKeywordLetterReplyKeywordLetterProps = {
    letterId: number;
    letterType: string;
    boxType: string;
};

export const useDeleteKeywordLetterReplyKeywordLetter = (
    {
        letterId,
        letterType,
        boxType
    }: UseDeleteKeywordLetterReplyKeywordLetterProps,
    options?: UseMutationOptions<string, Error, void>
) => {
    return useMutation<string, Error, void>({
        mutationFn: async () => {
            const response = await deleteKeywordLetterReplyKeywordLetter({
                letterId,
                letterType,
                boxType
            });
            return response.result;
        },
        ...options
    });
};
