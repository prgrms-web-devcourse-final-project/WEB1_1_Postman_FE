// src/mocks/browser.js
// worker 인스턴스를 생성하고, 요청 핸들러를 정의
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
