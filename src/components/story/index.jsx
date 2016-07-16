import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics';
//  <link rel="stylesheet" href="">
// 把文章body中img的src替换成自己服务器的连接，绕过盗链处理。
function replaceImgSrcToProxy(htmlString, styleUrl) {
  const element = document.createElement('div');
  // 使用zhihu的样式
  const style = document.createElement('link');
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('href', styleUrl);
  element.innerHTML = style.outerHTML + htmlString;
  for (const child of element.getElementsByTagName('img')) {
    const imgUrl = child.getAttribute('src');
    child.setAttribute('src', `${zhihuAPI}${imgUrl}`);
  }
  return element;
}

const Story = ({ story }) => (
  <div
    dangerouslySetInnerHTML={{ __html: replaceImgSrcToProxy(story.body, story.css[0]).innerHTML }}
  >
  </div>
);

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
