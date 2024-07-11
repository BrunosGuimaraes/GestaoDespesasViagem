const staticGestaoDespesasViagens = "pwa-gestao-despesas-viagens-v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js"
];

self.addEventListener("install", installEvent =>  {
    installEvent.waitUntil(
      caches.open(staticGestaoDespesasViagens).then(cache => {
        cache.addAll(assets)
      })
    )
})

self.addEventListener('activate', activateEvent => {
    activateEvent.waitUntil(
      caches.keys()
        .then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== staticGestaoDespesasViagens) {
              console.log('[ServiceWorker] Removing old cache', key)
              return caches.delete(key)
            }
          }))
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener ("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})