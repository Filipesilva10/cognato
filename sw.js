// ═══════════════════════════════════════
// COGNATO ESTOQUE — Service Worker PWA
// ═══════════════════════════════════════
const CACHE_NAME = 'cognato-v1';
const CACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap',
];

// ── Install: pre-cache recursos essenciais
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_URLS).catch(err => {
        console.warn('Cache parcial:', err);
      });
    })
  );
});

// ── Activate: limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first para recursos locais, network-first para API
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Nunca interceptar requests da API JSONBin (sync)
  if (url.hostname === 'api.jsonbin.io') return;

  // Para imagens externas do CDN: network-first com fallback cache
  if (url.hostname.includes('cdn.shoppub.io') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Para recursos do app: cache-first com fallback network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Fallback para o index.html em navegação offline
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ── Background Sync (futuro uso)
self.addEventListener('sync', event => {
  if (event.tag === 'cognato-sync') {
    console.log('Background sync disparado');
  }
});
