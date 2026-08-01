const CACHE_NAME = 'furqan-card-pwa-v15-smart-install';
const ASSETS_TO_CACHE = [
  './card.html',
  './card.css',
  './card.js',
  './manifest.json',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png',
  './apple-touch-icon.png',
  './favicon-96x96.png',
  './favicon.ico',
  './assets/furqansweets_logo.svg',
  './assets/halwa_main.png',
  './assets/halwa_sesame.png',
  './assets/halwa_nuts.png',
  './assets/qumbo caano.jpeg',
  './assets/use as is.jpg',
  './assets/furqan sweets audio.wav'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn("Service worker cache non-fatal warning:", err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const isHtml = event.request.destination === 'document' || 
                 event.request.url.endsWith('.html') || 
                 event.request.url.endsWith('/');

  if (isHtml) {
    // Network-First for HTML: Always fetch newest version, fallback to cache if offline
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then(cached => cached || caches.match('./card.html'));
        })
    );
  } else {
    // Stale-While-Revalidate for static assets: return cache immediately, update in background
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {/* offline or ignore */});

        return cachedResponse || fetchPromise;
      })
    );
  }
});
