import { SubscribeRequestType, SubscribeResponseType } from '@/types/subscirbe';
import { defaultApi } from '@/service/api';

export const postToken = async ({
    token
}: SubscribeRequestType): Promise<SubscribeResponseType> => {
    const api = defaultApi();

    const response = await api.post('/notification/subscribe', { token });
    return response.data;
};
