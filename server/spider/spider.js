import cheerio from 'cheerio';
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

                // type: /\/+(\w+)\//.exec(attribs.href)[1],
                // id:   /\/+(\d+)/.exec(attribs.href)[1],
function parseExplore(html) {
  const top = [];
  const hotCirclely = [];
  const hotStory = [];
  const $ = cheerio.load(html);

  return new Promise((resolve, reject) => {
    try {
      $('.slide-page').each((i, elem) => {
        const href = $(elem).attr('href');
        top.push({
          type:  /\/+(\w+)\//.exec(href)[1],
          id:    /\/+(\d+)/.exec(href)[1],
          title: $(elem).children('h3').text(),
        });
      });

      $('.topic-cell').each((i, elem) => {
        const href = $(elem).attr('href');
        hotCirclely.push({
          type:  /\/+(\w+)\//.exec(href)[1],
          id:    /\/+(\d+)/.exec(href)[1],
          title: $(elem).find('.title').text()
          .replace(/[\r\n]/g, ''),
          meta:  $(elem).find('.meta').text()
          .replace(/[\r\n]/g, ''),
        });
      });

      $('.article-cell').each((i, elem) => {
        const href = $(elem).attr('href');
        hotStory.push({
          type:  /\/+(\w+)\//.exec(href)[1],
          id:    /\/+(\d+)/.exec(href)[1],
          title: $(elem).find('.title').text()
          .replace(/[\r\n]/g, ''),
          view:  $(elem).find('.meta').text()
          .replace(/[\r\n]/g, ''),
        });
      });
    } catch (e) {
      reject(e);
    } finally {
      resolve({
        top,
        hotCirclely,
        hotStory,
      });
    }
  });
}

function saveToDataBase(explore) {

}
getExplore().then(data => parseExplore(data)).then((value) => { console.log(value); })
