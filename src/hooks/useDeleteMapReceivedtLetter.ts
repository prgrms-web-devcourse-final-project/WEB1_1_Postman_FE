import { deleteMapReceivedLetter } from '@/service/MapLetter/deleteMapReceivedtLetter';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type UseDeleteMapReceivedLettersProps = {
    letterIds: number[];
};

export const useDeleteMapReceivedLetter = (
    { letterIds }: UseDeleteMapReceivedLettersProps,
    options?: UseMutationOptions<number[], Error, void>
) => {
    return useMutation<number[], Error, void>({
        mutationFn: async () => {
            const response = await deleteMapReceivedLetter({
                letterIds
            });
            return response.result;
        },
        ...options
    });
};
