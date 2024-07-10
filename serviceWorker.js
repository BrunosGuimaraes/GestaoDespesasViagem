//instala e carrega os arquivos da aplicação para o cache
self.addEventListener('install', function (event) {
  caches.open('pwa-1.0').then(function(cache) {
      cache.addAll([
          '/',
          '/index.html',
          '/assets/js/app.js',
          '/assets/css/style.css',
          '/assets/icons/icon-delete.png',
          '/assets/icons/icon-edit.png',
      ])
  });
})

self.addEventListener('fetch', function(event) {
  let resposta = caches.open('pwa-1.0').then(function(cache) {
      return cache.match(event.request).then(function(recurso) {
          if(recurso){
              return recurso;
          } else {
              return fetch(event.request).then(function(recurso) {
                  cache.put(event.request, recurso.clone());
                  return recurso;
              });
          }
      });
  });
});