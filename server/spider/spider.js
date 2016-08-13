import HtmlParser from 'htmlparser2';
import https from 'https';

function getExplore() {
  const url = 'https://news-at.zhihu.com/api/7/explore?nightmode=0';
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          resolve(data);
        });
      } else {
        reject(res.statusCode);
      }
    }).on('error', () => reject(502));
  });
}

function parseExplore(html) {
  const top = [];
  const hotCirclely = [];
  const hotStory = [];
  return new Promise((resolve, reject) => {
    const parser = new HtmlParser.Parser({
      onopentag: (name, attribs) => {
        if (name === 'a') {
          switch (attribs.class) {
            case 'slide-page':
              top.push({
                type: /\/+(\w+)\//.exec(attribs.href)[1],
                id:   /\/+(\d+)/.exec(attribs.href)[1],
              });
              break;
            case 'topic-cell':
              hotCirclely.push({
                id: /\/+(\d+)/.exec(attribs.href)[1],
              });
              break;
            case 'article-cell':
              hotStory.push({
                id: /\/+(\d+)/.exec(attribs.href)[1],
              });
              break;
            default:
              break;
          }
        }
      },
      ontext: text => {
        console.log(text);
      },
    });
    try {
      parser.write(html);
    } catch (e) {
      reject(e);
    }
    parser.end();
    resolve({
      top,
      hotCirclely,
      hotStory,
    });
  });
}
getExplore()
  .then(data => parseExplore(data))
  .then(data => { console.log(data); });
