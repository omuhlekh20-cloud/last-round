/* Last Round — offline app cache. Bump CACHE when publishing an update. */
const CACHE = 'last-round-v7';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './icon.svg', './icon-192.png', './icon-512.png',
  './icon-maskable.png'
];
const OPTIONAL = ['./home-bg.jpg', './home-bg.jpeg', './home-bg.png', './home-bg.webp'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    await Promise.all(OPTIONAL.map(async path => {
      try {
        const response = await fetch(path, { cache: 'no-cache' });
        if (response.ok) await cache.put(path, response);
      } catch (_) { /* Optional background image is not required. */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('last-round-') && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request, { ignoreSearch: true });
    const networkUpdate = fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        event.waitUntil(cache.put(request, copy));
      }
      return response;
    });
    if (cached) {
      // Refresh in the background while returning the saved copy immediately.
      event.waitUntil(networkUpdate.catch(() => undefined));
      return cached;
    }
    try {
      return await networkUpdate;
    } catch (_) {
      if (request.mode === 'navigate') {
        return (await cache.match('./index.html')) || Response.error();
      }
      return new Response('', { status: 504, statusText: 'Offline' });
    }
  })());
});
