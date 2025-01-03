const cacheName = '::myServiceWorker';
const version = 'v0.0.1';
const cacheList = [];

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            if (r) {
                return r;
            }

            const fetchRequest = e.request.clone();

            return fetch(fetchRequest).then((response) => {
                if (!response) {
                    return response;
                }

                const requestUrl = e.request.url || '';

                const responseToCache = response.clone();
                if (
                    !requestUrl.startsWith('chrome-extension') &&
                    e.request.method !== 'POST'
                )
                    caches.open(version + cacheName).then((cache) => {
                        cache.put(e.request, responseToCache);
                    });

                return response;
            });
        })
    );
});
