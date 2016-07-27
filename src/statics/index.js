// 所有知乎api url请求前缀
let host = 'localhost:1234';
if (process.env.NODE_ENV === 'production') {
  host = 'localhost:8001';
}
const zhihuAPI = `http://${host}/zhihu?url=`;
export { zhihuAPI };
