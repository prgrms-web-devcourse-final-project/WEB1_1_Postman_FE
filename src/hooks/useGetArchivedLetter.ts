import { useSuspenseQuery } from '@tanstack/react-query';
import { getArchivedMapLetter } from '@/service/MapLetter/getArchivedLetter';
import { getArchivedMapLetterResultType } from '@/types/letter';

type UseArchivedLetterProps = {
    letterId: string;
};

export const useGetArchivedLetter = ({ letterId }: UseArchivedLetterProps) => {
    return useSuspenseQuery<getArchivedMapLetterResultType, Error>({
        queryKey: ['archivedMapLetter', letterId],
        queryFn: async () => {
            const response = await getArchivedMapLetter({ letterId });
            return response;
        }
    });
};
