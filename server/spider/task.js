import { grabExploreToRAMDB } from './spider';
export default class SpiderTask {
  // 30min
  constructor(interval = 30 * 60 * 1 * 1000) {
    this.interval = interval;
  }
  start() {
   // grabExploreToRAMDB();
    console.log(this.interval);
    grabExploreToRAMDB();
    this.tag = setTimeout(this.start, this.interval);
  }
  stop() {
    clearInterval(this.tag);
  }
}
