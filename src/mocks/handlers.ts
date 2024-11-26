// 구체적인 api 핸들링은 여기에 작성
import { http, HttpResponse } from 'msw';

export const handlers = [
    // 예시
    http.get('/api/users', () => {
        return HttpResponse.json([
            { id: 1, name: '홍길동' },
            { id: 2, name: '김철수' }
        ]);
    }),

    http.post('/api/login', async ({ request }) => {
        const { username, password } = await request.json();

        if (username === 'test' && password === 'test') {
            return HttpResponse.json({
                id: 1,
                username: 'test',
                token: 'fake-token'
            });
        }

        return new HttpResponse(null, {
            status: 401,
            statusText: 'Unauthorized'
        });
    })
];
