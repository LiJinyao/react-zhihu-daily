import { grabExplore } from './spider';
export default class SpiderTask {
  constructor(interval = 1000000000) {
    this.interval = interval;
    this.tag = null;
  }
  start() {
    this.tag = setInterval(grabExplore, this.interval);
  }
  stop() {
    clearInterval(this.tag);
  }
}
