import { grabExploreToRAMDB } from './spider';
export default class SpiderTask {
  // 30min
  constructor(interval = 30 * 60 * 1 * 1000) {
    this.interval = interval;
    this.tag = 0;
  }
  start() {
    grabExploreToRAMDB();
    this.tag = setTimeout(this.start, this.interval);
  }
  stop() {
    clearInterval(this.tag);
  }
}
