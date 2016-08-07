// 所有知乎api url请求前缀
let zhihuAPI = 'http://localhost:1234/zhihu?url=';
if (process.env.NODE_ENV === 'production') {
  zhihuAPI = 'https://zhihudaily.lijinyao.com/zhihu?url=';
}
export { zhihuAPI };
