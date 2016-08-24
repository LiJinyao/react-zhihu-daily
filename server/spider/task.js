import { grabExploreToRAMDB } from './spider';
import log4js from 'log4js';
const logger = log4js.getLogger();
export default class SpiderTask {
  // 30min
  constructor(interval = 30 * 60 * 1 * 1000) {
    this.interval = interval;
    this.tag = 0;
  }
  start() {
    const interval = this.interval;
    function runTask() {
      logger.debug(`Spider task start, interval: ${interval}ms.`);
      grabExploreToRAMDB();
      return setTimeout(runTask, interval);
    }
    this.tag = runTask();
  }
  stop() {
    clearInterval(this.tag);
  }
}
