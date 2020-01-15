const http = require('http');
const fs = require('fs');
// const path = require('path');

http
	.createServer(function (req, res) {
		// router
		console.log(req.url);
		if (req.url === '/') {
			const html = fs.readFileSync('test.html', 'utf8');
			res.writeHead(200, {
				// 'Content-Type' : 'text/plain'
				'Content-Type' : 'text/html'
			});
			//会把 html 的文件放进去
			res.end(html);
		}

		if (req.url == '/script.js') {
			// 服务器判断 来进行 no-cache 的杨峥
			console.log('req.headers', req.headers);
			let etag = req.headers['if-none-match'];
			if (etag !== '777') {
				res.writeHead(200, {
					'Content-Type'  : 'text/javascript',
					'Cache-Control' : 'max-age=2000000, no-cache',
					'Last-Modified' : '123',
					Etag            : '777'
				});
				//如果请求 script.js, 则返回
				res.end('console.log("script loaded")');
			}
			else {
				//重定向 读浏览器缓存
				res.writeHead(304, {
					'Content-Type'  : 'text/javascript',
					'Cache-Control' : 'max-age=2000000, no-cache',
					'Last-Modified' : '123',
					Etag            : 777
				});
				//如果请求 script.js, 则返回
				res.end('');
			}
		}
	})
	.listen(8887);
console.log('server on');
// console.log('path', path);
