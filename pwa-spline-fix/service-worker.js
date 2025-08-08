self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  // Sempre pega online para o Spline
  if (event.request.url.includes("my.spline.design")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Para o resto: rede primeiro, cache se offline
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
