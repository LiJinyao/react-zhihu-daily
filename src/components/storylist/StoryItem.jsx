import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics';
import style from './StoryItem.styl';
import { Link } from 'react-router';

const StoryItem = ({ title, images, id }) => (
  <Link className={style.storyItem} to={`/news/${id}`} >
    <img className={style.img} src={zhihuAPI + images[0]} alt="Story" />
    <div className={style.titleBox}>
      <p className={style.title}> {title} </p>
    </div>
  </Link>
);

StoryItem.propTypes = {
  title:  PropTypes.string,
  images: PropTypes.array,
  id:     PropTypes.number,
};

export default StoryItem;
