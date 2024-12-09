import { defaultApi } from '@/service/api';

type RequestBody = {
    title: string;
    content: string;
    description: string;
    latitude: number;
    longitude: number;
    font: string;
    paper: string;
    label: string;
    target: string;
};

type ResponseBody = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
};

export const createMapTargerLetter = async ({
    title,
    content,
    description,
    latitude,
    longitude,
    font,
    paper,
    label,
    target
}: RequestBody): Promise<ResponseBody> => {
    const api = defaultApi();

    const response = await api.post('/map/target', {
        title,
        content,
        description,
        latitude,
        longitude,
        font,
        paper,
        label,
        target
    });
    return response.data;
};
