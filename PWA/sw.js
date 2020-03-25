// service worker的变成
// 不能访问 dom, 这是特有的上下文

//只能恩 service worker 的监听逻辑: install, actvite, fetch
self.addEventListener('install', event => {
  //在新的 service worker 第一次安装时,
  // 在版本不一样重新安装时
  console.log('install3', event);
  //是一个callback, 会推迟 activate 的执行
  event.waitUntil(new Promise(resolve => setTimeout(resolve, 3000)));
  // self.skipWaiting: 强势执行新的 serviceworker
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  console.log('activate', event);
  event.waitUntil(self.clients.clainm());
  //还有 pwa 中 还有 push /poll
});
self.addEventListener('fetch', event => {
  // catch api 拿到本地
  console.log('fetch', event);
});
