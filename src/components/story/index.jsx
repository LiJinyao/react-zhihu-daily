import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics';
import style from './story.styl';

// 把文章body中img的src替换成自己服务器的连接，绕过盗链处理。
function replaceImgSrcToProxy(htmlString, styleUrl, headerImgUrl) {
  const element = document.createElement('div');
  // 使用zhihu的样式
  const zhihuStyle = document.createElement('link');
  zhihuStyle.setAttribute('rel', 'stylesheet');
  zhihuStyle.setAttribute('href', styleUrl);
  element.innerHTML = zhihuStyle.outerHTML + htmlString;
  for (const child of element.getElementsByTagName('img')) {
    const imgUrl = child.getAttribute('src');
    child.setAttribute('src', `${zhihuAPI}${imgUrl}`);
  }
  const headerImg = element.querySelector('.img-place-holder');
  headerImg.innerHTML = `<img src="${zhihuAPI}${headerImgUrl}" alt="header" />`;
  return element;
}

const Story = ({ story }) => (
  <div
    className={style.storyBody}
    dangerouslySetInnerHTML={{
      __html: replaceImgSrcToProxy(story.body, story.css[0], story.image).innerHTML,
    }}
  >
  </div>
);

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
