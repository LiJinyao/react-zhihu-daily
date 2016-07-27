// 所有知乎api url请求前缀
let host = 'localhost:1234';
if (process.env.NODE_ENV === 'production') {
  host = 'zhihudaily.lijinyao.com';
}
const zhihuAPI = `http://${host}/zhihu?url=`;
export { zhihuAPI };
