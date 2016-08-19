import { grabExploreToRAMDB } from './spider';
export default class SpiderTask {
  // 30min
  constructor(interval = 30 * 60 * 1 * 1000) {
    this.interval = interval;
    this.tag = null;
  }
  start() {
    this.tag = setInterval(grabExploreToRAMDB, this.interval);
  }
  stop() {
    clearInterval(this.tag);
  }
}
