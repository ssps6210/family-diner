const CACHE = 'family-diner-v1';
const ASSETS = [
  '/family-diner/',
  '/family-diner/index.html',
  '/family-diner/manifest.json',
  '/family-diner/icon-192.png',
  '/family-diner/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/family-diner/')))
  );
});
