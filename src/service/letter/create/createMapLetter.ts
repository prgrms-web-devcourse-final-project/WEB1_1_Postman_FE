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
};

type ResponseBody = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string;
};

export const createMapLetter = async ({
    title,
    content,
    description,
    latitude,
    longitude,
    font,
    paper,
    label
}: RequestBody): Promise<ResponseBody> => {
    const api = defaultApi();

    const response = await api.post('/map/public', {
        title,
        content,
        description,
        latitude,
        longitude,
        font,
        paper,
        label
    });
    return response.data;
};
