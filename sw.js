// Service worker: simpan file aplikasi di HP supaya bisa dibuka tanpa sinyal.
// Naikkan angka VERSI setiap kali file aplikasi diganti.
var VERSI = 'ritase-v29';
var FILES = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSI).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSI; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  e.respondWith(new Promise(function (resolve) {
    var done = false;
    var t = setTimeout(function () {
      caches.match(e.request).then(function (c) {
        if (!done) { done = true; resolve(c || fetch(e.request)); }
      });
    }, 4000);
    fetch(e.request).then(function (r) {
      clearTimeout(t);
      if (r && r.ok) { var cp = r.clone(); caches.open(VERSI).then(function (c) { c.put(e.request, cp); }); if (!done) { done = true; resolve(r); } }
      else { caches.match(e.request).then(function (c) { if (!done) { done = true; resolve(c || r); } }); }
    }).catch(function () {
      clearTimeout(t);
      caches.match(e.request).then(function (c) { if (!done) { done = true; resolve(c || new Response('Offline', { status: 503 })); } });
    });
  }));
});
