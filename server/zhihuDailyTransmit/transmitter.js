/**
 * Transmit api calls to Zhihu daily official site.
 */
import http from 'http';

function get(route = '/') {
  return new Promise((resolve, reject) => {
    http.get(`http://news-at.zhihu.com/api/4${route}`, res => {
      let buf = '';
      res.on('data', chunk => { buf += chunk; });
      res.on('end', () => resolve(buf));
      res.on('error', e => reject(e));
    });
  });
}
export default get;
