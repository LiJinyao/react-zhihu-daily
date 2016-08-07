import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics';
import style from './StoryItem.styl';
import { Link } from 'react-router';

const StoryItem = ({ title, images, id, storyExtra, linkPrefix }) => (
  <Link className={style.storyItem} to={`${linkPrefix}/${id}`} >
  {images &&
    <img className={style.img} src={zhihuAPI + images[0]} alt="Story" />
  }
    <div className={style.titleBox}>
      <p className={style.title}> {title} </p>
      {
        storyExtra && storyExtra.has(id) &&
          <span className={style.extra}>
            <span className="iconfont">{'\ue601 '}</span>
            {storyExtra.get(id).comments}
            <span className="iconfont">{' \ue600 '}</span>
            {storyExtra.get(id).popularity}
          </span>
      }
    </div>
  </Link>
);

StoryItem.propTypes = {
  title:      PropTypes.string,
  images:     PropTypes.array,
  id:         PropTypes.number,
  storyExtra: PropTypes.instanceOf(Map),
  linkPrefix: PropTypes.string,
};

export default StoryItem;