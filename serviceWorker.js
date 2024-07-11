self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('expense-cache').then((cache) => {
          return cache.addAll([
              '/',
              '/public/index.html',
              '/public/css/style.css',
              '/public/js/app.js',
              '/public/manifest.json',
              '/public/icons/icon-delete.png',
              '/public/icons/icon-edit.png',
              '/public/icons/travel-icon.png',
          ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          return response || fetch(event.request);
      })
  );
});