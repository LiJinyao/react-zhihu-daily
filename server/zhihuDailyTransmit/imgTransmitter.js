import http from 'http';
/**
 * 转发知乎的图片
 * @param imgUrl
 * @param ServerRes
 * @returns {Promise}
 */
function getImg(imgUrl = '/', ServerRes) {
  return new Promise((resolve, reject) => {
    http.get(imgUrl, res => {
      if (res.statusCode === 200) {
        ServerRes.status(200);
        res.on('data', chunk => { ServerRes.write(chunk); });
        res.on('end', () => resolve());
      } else {
        reject(res.statusCode);
      }
    }).on('error', () => reject(502));
  });
}

export default getImg;
