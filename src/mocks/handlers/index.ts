import { signUpHandler } from './signUpHandler';
import { LoginHandler } from './LoginHandler';

export const handlers = [...signUpHandler, ...LoginHandler];
