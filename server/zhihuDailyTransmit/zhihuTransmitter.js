import http from 'http';
import https from 'https';
import url from 'url';

const zhihuHostName = new Set(['zhihu.com', 'zhimg.com']);

// 检查是否是知乎的域名
function checkHostName(urlString) {
  const zhihuUrl = url.parse(urlString);
  // 比较顶级域名
  return zhihuHostName.has(zhihuUrl.hostname.replace(/.+?\./, ''));
}

/*
根据url的不同返回http或https的get方法。
 */
function getRequestMethod(urlString) {
  const zhihuUrl = url.parse(urlString);
  if (zhihuUrl.protocol === 'https:') {
    return https.get;
  }
  return http.get;
}

function zhihuApiTransmitter(zhihuUrl = '/', serverRes) {
  return new Promise((resolve, reject) => {
    if (checkHostName(zhihuUrl)) {
      // 有的链接是http协议，有的是https协议，不同的协议用不同的get方法。
      getRequestMethod(zhihuUrl)(zhihuUrl, res => {
        if (res.statusCode === 200) {
          serverRes.status(200);
          serverRes.set(res.headers);
          res.on('data', chunk => { serverRes.write(chunk); });
          res.on('end', () => {
            serverRes.end();
            resolve();
          });
        } else {
          reject(res.statusCode);
        }
      }).on('error', () => reject(502));
    } else {
      serverRes.status(404).send('The request url is not belong to Zhihu.');
    }
  });
}

export default zhihuApiTransmitter;
