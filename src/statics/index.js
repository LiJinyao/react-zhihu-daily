// 所有知乎api url请求前缀
let zhihuAPI = 'http://localhost:1234/zhihu';
if (process.env.NODE_ENV === 'production') {
  zhihuAPI = 'https://zhihudaily.lijinyao.com/zhihu';
}
export { zhihuAPI };
