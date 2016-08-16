import query from './sqlHelper';

/**
 * [getExplore description]
 * @param  {[Date]} date 想要获取的日期
 * @return {[type]}      [description]
 */
function getExplore(date = new Date()) {
  const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  return query(`SELECT * FROM explore WHERE time='${time}'`);
}
// getExplore();
export default getExplore;
