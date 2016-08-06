import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics';
import style from './story.styl';

// 把文章body中img的src替换成自己服务器的链接，绕过盗链处理。
function replaceImgSrcToProxy(story) {
  const element = document.createElement('div');
  // 使用zhihu的样式
  const zhihuStyle = document.createElement('link');
  zhihuStyle.setAttribute('rel', 'stylesheet');
  zhihuStyle.setAttribute('href', `${zhihuAPI}${story.css[0]}`);
  element.innerHTML = zhihuStyle.outerHTML + story.body;
  // 把中img的src替换成自己服务器的链接。
  const images = element.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const imgUrl = images[i].getAttribute('src');
    images[i].setAttribute('src', `${zhihuAPI}${imgUrl}`);
  }
  // 删除banner
  element.querySelector('.headline').remove();
  return element;
}
function scrollToTop() {
  let interval = 0;
  const duration = 1000;
  const element = document.body;
  const startTime = Date.now();
  const endTime = startTime + duration;
  const startTop = element.scrollTop;
  const distance = - startTop;

  function somthStep(start, end, point) {
    if (point <= start) { return 0; }
    if (point >= end) { return 1; }
    const x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  }

  function scrollFrame() {
    const now = Date.now();
    const point = somthStep(startTime, endTime, now);
    window.scrollTo(0, Math.round(startTop + (distance * point)));
    if (now >= endTime) {
      clearInterval(interval);
    }
  }
  interval = setInterval(scrollFrame, 1);
}

const Story = ({ story }) => (
  <div className={style.storyWarp}>
    <div
      className={style.imgPlaceHolder}
      style={{ backgroundImage: `url(${zhihuAPI}${story.image})` }}
    >
      <div className={style.imgBannerBackground}></div>
      <span className={style.storyListitle}>{story.title}</span>
      <span className={style.imageCopyright}>图片：${story.image_source}</span>
    </div>
    <div
      className={style.storyBody}
      dangerouslySetInnerHTML={{
        __html: replaceImgSrcToProxy(story).innerHTML,
      }}
    >
    </div>
    <div className={style.scrollTop} onClick={scrollToTop}>scroll to top</div>
  </div>
);

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
