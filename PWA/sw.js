// service worker的变成
// 不能访问 dom, 这是特有的上下文

//只能恩 service worker 的监听逻辑: install, actvite, fetch
self.addEventListener('install', event => {
  项目列表应该自动构建, 而不是人工构建;
  event.waitUtil(cached);
});
self.addEventListener('activate', event => {
  console.log('activate', event);
  event.waitUntil(self.clients.clainm());
  //还有 pwa 中 还有 push /poll
});
self.addEventListener('fetch', event => {
  // catch api 拿到本地
  console.log('fetch', event);
  event.responseWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
        });
      });
    })
  );
});
