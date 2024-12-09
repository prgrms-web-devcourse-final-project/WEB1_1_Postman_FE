import { useQuery } from '@tanstack/react-query';
import { getArchivedMapLetter } from '@/service/MapLetter/getArchivedLetter';
import { getArchivedMapLetterResultType } from '@/types/letter';

type UseArchivedLetterProps = {
    letterId: number;
};

export const useGetArchivedLetter = ({ letterId }: UseArchivedLetterProps) => {
    return useQuery<getArchivedMapLetterResultType, Error>({
        queryKey: ['archivedMapLetter', letterId],
        queryFn: async () => {
            const response = await getArchivedMapLetter({ letterId });
            return response;
        },
        enabled: !!letterId
    });
};
