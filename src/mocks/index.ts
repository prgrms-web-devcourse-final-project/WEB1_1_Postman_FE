// 모킹 api 초기화, 실행
async function initMocks() {
    if (import.meta.env.MODE === 'development') {
        const { worker } = await import('./browser');
        return worker.start({
            onUnhandledRequest: 'bypass' // 모킹되지 않은 api는 그냥 통과
        });
    }
    return Promise.resolve();
}

// 개발 환경에서 실행됨...
if (import.meta.env.MODE === 'development') {
    initMocks();
}

export default initMocks;
