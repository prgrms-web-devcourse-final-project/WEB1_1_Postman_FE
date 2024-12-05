import { LetterType, CreateLetterResponseType } from '@/types/letter';
import { defaultApi } from '@/service/api';

export const createLetter = async ({
    title,
    content,
    keywords,
    font,
    paper,
    label
}: LetterType): Promise<CreateLetterResponseType> => {
    const api = defaultApi();

    const response = await api.post('/letters', {
        title,
        content,
        keywords,
        font,
        paper,
        label
    });
    return response.data;
};
