/**
 * grab explore index.
 */
import cheerio from 'cheerio';
import https from 'https';
import query from '../database/sqlHelper';
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
          meta:  $(elem).find('.meta').text()
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

function saveToDataBase(items) {
  let querySet = 'REPLACE INTO explore (id, type, title, meta, top, time) VALUES ';
  const today = new Date();
  function addToQuery(item, key) {
    const { type, id, title, meta } = item;
    const sqlQuery = `\n(${id}, '${type}', '${title}', '${meta}', ${key === 'top' ? 1 : 0}, '${today.getFullYear()}-${today.getMonth()}-${today.getDay()}'),`;
    querySet += sqlQuery;
  }

  return new Promise((resolve, reject) => {
    for (const key of Object.keys(items)) {
      items[key].forEach(item => {
        addToQuery(item, key);
      });
    }
    query(querySet.substring(0, querySet.length - 1))
    .then((value) => { resolve(value); })
    .catch((err) => { reject(err); });
  });
}
getExplore()
.then(data => parseExplore(data))
.then((value) => saveToDataBase(value))
.then((value) => { console.log(value); })
.catch((err) => {console.log(err);});
