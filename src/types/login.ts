import { UserType } from './user';

type LoginType = {
    code: string;
    status: string;
    message: string;
    data: UserType;
};

export type { LoginType };
