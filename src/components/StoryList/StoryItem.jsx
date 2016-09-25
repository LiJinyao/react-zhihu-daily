import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics';
import style from './StoryItem.styl';
import { Link } from 'react-router';

const StoryItem = ({ title, images, id, storyExtra, linkPrefix, externalUrl }) => {
  const body = (
    <div>
    {images &&
      <img className={style.img} src={`${zhihuAPI}?url=${images[0]}`} alt="Story" />
    }
      <div className={style.titleBox}>
        <p className={style.title}> {title} </p>
        {
          storyExtra &&
            <span className={style.extra}>
              <span className="iconfont">{'\ue601 '}</span>
              {storyExtra.comments}
              <span className="iconfont">{' \ue600 '}</span>
              {storyExtra.popularity}
            </span>
        }
      </div>
    </div>
  );
  if (externalUrl) {
    return (
      <a className={style.storyItem} href={externalUrl} target="_blank">
      {body}
      </a>
    );
  }
  return (
    <Link className={style.storyItem} to={`${linkPrefix}/${id}`} >
      {body}
    </Link>
  );
};

StoryItem.propTypes = {
  title:        PropTypes.string,
  images:       PropTypes.array,
  id:           PropTypes.number,
  storyExtra:   PropTypes.object,
  linkPrefix:   PropTypes.string,
  externalUrl:  PropTypes.string,
};

export default StoryItem;
