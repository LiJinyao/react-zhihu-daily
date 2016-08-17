// 单例模式实现的简单的内存数据库
// 直接把爬到的数据存在内存中
// 并定时跟新这部分内容
// api直接从这里获取数据
let instance = null;

class exploreDB {
  constructor() {
    if (!instance) {
      instance = this;
      this.DB = {
        explore:    {},
        circleInfo: {},
        lastUpdate: 0,
      };
    }
    return instance;
  }
  update(key, value) {
    this.DB[key] = value;
    this.DB.lastUpdate = Date.now();
  }
  get(key) {
    return this.DB[key];
  }
}
// let c1 = new exploreDB();
// let c2 = new exploreDB();
// console.log(c1 === c2);
export default exploreDB;
