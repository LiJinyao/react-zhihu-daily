import cheerio from 'cheerio';
import https from 'https';
import query from '../database/sqlHelper';

function httpsGet(url) {
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

// 抓取首页html
function getExplore() {
  const url = 'https://news-at.zhihu.com/api/7/explore?nightmode=0';
  return httpsGet(url);
}

// 解析首页html
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
          image: $(elem).children('img').attr('src'),
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
          image: $(elem).children('img').attr('src'),
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
          image: $(elem).children('img').attr('src'),
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

// 存到数据库
function saveExploreToDataBase(items) {
  let querySet = 'REPLACE INTO explore (id, type, title, meta, image, top, time) VALUES ';
  const today = new Date();
  function addToQuery(item, key) {
    const { type, id, title, meta, image } = item;
    const sqlQuery = `\n(${id}, '${type}', '${title}', '${meta}', '${image || null}',
    ${key === 'top' ? 1 : 0}, '${today.getFullYear()}-${today.getMonth()}-${today.getDay()}'),`;
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

// 返回每个日报的信息。
function getCirclesIndex(circles) {
  const requestes = [];
  return new Promise((resolve, reject) => {
    circles.forEach(item => {
      const api = `https://news-at.zhihu.com/api/7/circle/${item.id}`;
      requestes.push(httpsGet(api));
    });
    Promise.all(requestes)
    .then((value) => { resolve(value); })
    .catch(err => reject(err));
  });
}

// 过滤首页的内容类型，目前分为 circle 和 story
function filterExplore(items, type = 'circle') {
  const result = [];
  for (const key of Object.keys(items)) {
    result.push(...items[key].filter(item => item.type === type));
  }
  return result;
}

// 储存circle的详细信息
function saveCirclesIndex(circles) {
  let querySet = 'REPLACE INTO circle_index (id, circle) VALUES ';
  function addToQuery(id, circle) {
    const sqlQuery = `\n(${id}, '${circle}'),`;
    querySet += sqlQuery;
  }
  circles.forEach(circle => {
    const json = JSON.parse(circle);
    addToQuery(json.id, circle);
  });
  return new Promise((resolve, reject) => {
    query(querySet.substring(0, querySet.length - 1))
    .then((value) => { resolve(value); })
    .catch((err) => { reject(err); });
  });
}


export function grabExplore() {
  getExplore()
  .then(data => parseExplore(data))
  .then((value) => {
    getCirclesIndex(filterExplore(value))
    .then((counts) => saveCirclesIndex(counts));
    return saveExploreToDataBase(value);
  })
  .catch(); // TODO
}
