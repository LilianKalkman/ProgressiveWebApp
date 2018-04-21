self.addEventListener('install', function(event){
  console.log('[service worker] installing ...', event);
});

self.addEventListener('activate', function(event){
  console.log('[service worker] activating ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event){
  console.log('[SW] fetching something ...', event);
  event.respondWith(fetch(event.request));
});
