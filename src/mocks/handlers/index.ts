import { LoginHandler } from './LoginHandler';
import { RegisterHandler } from './RegisterHandler';
import { userEditHandler } from './userEditHandler';

export const handlers = [
    ...LoginHandler,
    ...RegisterHandler,
    ...userEditHandler
];
