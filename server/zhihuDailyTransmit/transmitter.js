/**
 * Transmit api calls to Zhihu daily official site.
 */
import http from 'http';

function get(route = '/') {
  return new Promise((resolve, reject) => {
    http.get(`http://news-at.zhihu.com/api/4${route}`, res => {
      // console.log(`Got response: ${res.statusCode}`);
      if (res.statusCode === 200) {
        res.setEncoding('utf8');
        let buf = '';
        res.on('data', chunk => { buf += chunk; });
        res.on('end', () => resolve(buf));
      } else {
        reject(res.statusCode);
      }
      res.resume();
    }).on('error', () => reject(502));
  });
}
export default get;

