import { getArchivedMapLetter } from '@/service/MapLetter/getArchivedLetter';
import { GetArchivedMapLetterResponseType } from '@/types/letter';
import { useQuery } from '@tanstack/react-query';

export const useGetArchivedLetter = (letterId: string) => {
    return useQuery<GetArchivedMapLetterResponseType, Error>({
        queryKey: ['archivedMapLetter', letterId],
        queryFn: async () => {
            return await getArchivedMapLetter(letterId);
        }
    });
};
