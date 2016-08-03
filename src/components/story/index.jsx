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
  // 显示banner
  const headerImg = element.querySelector('.img-place-holder');
  // 加入标题显示
  headerImg.innerHTML = `
    <img src="${zhihuAPI}${story.image}" alt="header" />
    <div class="img-banner-background"></div>
    <span class="story-title">${story.title}</span>
    <span class="image-copyright">图片：${story.image_source}</span>
  `;
  return element;
}

const Story = ({ story }) => (
  <div
    className={style.storyBody}
    dangerouslySetInnerHTML={{
      __html: replaceImgSrcToProxy(story).innerHTML,
    }}
  >
  </div>
);

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
