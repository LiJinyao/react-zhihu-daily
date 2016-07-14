import http from 'http';
import url from 'url';

const zhihuHostName = new Set(['zhihu.com', 'zhimg.com']);

// 检查是否是知乎的域名
function checkHostName(urlString) {
  const zhihuUrl = url.parse(urlString);
  // 比较顶级域名
  return zhihuHostName.has(zhihuUrl.hostname.replace(/.+?\./, ''));
}

function zhihuApiTransmitter(zhihuUrl = '/', serverRes) {
  return new Promise((resolve, reject) => {
    if (checkHostName(zhihuUrl)) {
      http.get(zhihuUrl, res => {
        if (res.statusCode === 200) {
          serverRes.status(200);
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
