// 单例模式实现的简单的内存数据库
// 直接把爬到的数据存在内存中
// 并定时跟新这部分内容
// api直接从这里获取数据
import log4js from 'log4js';
const logger = log4js.getLogger();
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
      // deep clone data
      this.DB[key] = JSON.parse(JSON.stringify(value));
    } else {
      this.DB[key] = value;
    }
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
