async function setUpMocks() {
    const { worker } = await import('./browser');
    return worker.start({
        onUnhandledRequest: 'bypass' // 모킹되지 않은 api는 그냥 통과
    });
}

async function initMocks() {
    if (import.meta.env.MODE === 'development') {
        setUpMocks();
    }
    return Promise.resolve();
}

initMocks().catch(console.error);

export default initMocks;