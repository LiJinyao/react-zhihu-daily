// 所有知乎api url请求前缀
let zhihuAPI = 'http://10.50.33.151:1234/zhihu?url=';
if (process.env.NODE_ENV === 'production') {
  zhihuAPI = 'https://zhihudaily.lijinyao.com/zhihu?url=';
}

export { zhihuAPI };
