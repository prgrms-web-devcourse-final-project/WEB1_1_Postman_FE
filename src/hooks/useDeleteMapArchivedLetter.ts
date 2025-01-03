import { deleteMapArchivedLetter } from '@/service/MapLetter/deleteMapArchivedLetter';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type UseDeleteMapArchivedLettersProps = {
    archiveIds: number[];
};

export const useDeleteMapArchivedLetter = (
    { archiveIds }: UseDeleteMapArchivedLettersProps,
    options?: UseMutationOptions<number[], Error, void>
) => {
    return useMutation<number[], Error, void>({
        mutationFn: async () => {
            const response = await deleteMapArchivedLetter({
                archiveIds
            });
            return response.result;
        },
        ...options
    });
};
