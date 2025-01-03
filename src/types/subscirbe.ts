export type SubscribeRequestType = {
    token: string;
};

export type SubscribeResponseType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        userId: number;
    };
};
