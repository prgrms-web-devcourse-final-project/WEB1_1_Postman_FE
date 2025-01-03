import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { getArchivedMapLetterResultType } from '@/types/letter';

type ArchivedMapLetterRequestProps = {
    letterId: number;
};

type ArchivedMapLetterResponse =
    ApiResponseType<getArchivedMapLetterResultType>;

export async function getArchivedMapLetter({
    letterId
}: ArchivedMapLetterRequestProps): Promise<getArchivedMapLetterResultType> {
    const api = defaultApi();

    const response = await api.get<ArchivedMapLetterResponse>(
        `/map/archive/${letterId}`
    );
    return response.data.result;
}
