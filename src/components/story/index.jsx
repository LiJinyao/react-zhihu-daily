import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics';

// 把文章body中img的src替换成自己服务器的连接，绕过盗链处理。
function replaceImgSrcToProxy(htmlString) {
  const element = document.createElement('div');
  element.innerHTML = htmlString;
  for (const child of element.getElementsByTagName('img')) {
    const imgUrl = child.getAttribute('src');
    child.setAttribute('src', `${zhihuAPI}${imgUrl}`);
  }
  return element;
}

const Story = ({ story }) => (
  <div dangerouslySetInnerHTML={{ __html: replaceImgSrcToProxy(story.body).innerHTML }}>
  </div>
);

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
