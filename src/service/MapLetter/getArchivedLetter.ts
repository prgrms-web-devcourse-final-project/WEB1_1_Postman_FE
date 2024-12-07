import { GetArchivedMapLetterResponseType } from './../../types/letter';
import { defaultApi } from '../api';

export const getArchivedMapLetter = async (
    letterId: string
): Promise<GetArchivedMapLetterResponseType> => {
    const api = defaultApi();
    const response = await api.get(`/map/archive/${letterId}`);
    return response.data;
};
