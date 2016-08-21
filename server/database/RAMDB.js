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
        lastUpdates: new Map(),
      };
    }
    return instance;
  }
  update(key, value) {
    if (typeof value === 'object') {
      // deep copy object
      this.DB[key] = Object.assign({}, value);
    } else {
      this.DB[key] = value;
    }
    console.log(value);
    this.DB.lastUpdates.set(key, Date.now());
  }
  get(key) {
    return {
      value:      this.DB[key] || {},
      lastUpdate: this.DB.lastUpdates.get(key) || 0,
    };
  }
}

export default exploreDB;
