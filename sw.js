// Service worker: simpan file aplikasi di HP supaya bisa dibuka tanpa sinyal.
// Naikkan angka VERSI setiap kali file aplikasi diganti.
var VERSI = 'ritase-v19';
var FILES = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSI).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSI; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
// Online: selalu ambil versi terbaru (lewati cache browser), lalu simpan. Offline atau sinyal lambat (4 detik): pakai simpanan.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(new Promise(function (resolve) {
    var done = false;
    function pakaiCache() { caches.match(e.request, { ignoreSearch: true }).then(function (hit) { if (!done) { done = true; resolve(hit || fetch(e.request)); } }); }
    var t = setTimeout(pakaiCache, 4000);
    fetch(e.request, { cache: 'no-cache' }).then(function (r) {
      clearTimeout(t);
      if (r && r.ok) { var cp = r.clone(); caches.open(VERSI).then(function (c) { c.put(e.request, cp); }); if (!done) { done = true; resolve(r); } }
      else pakaiCache();
    }).catch(function () { clearTimeout(t); pakaiCache(); });
  }));
});
