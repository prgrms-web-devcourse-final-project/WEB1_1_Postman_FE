import { UserType } from './user';

type LoginType = {
    code: number;
    status: string;
    message: string;
    data: UserType;
};

export type { LoginType };
