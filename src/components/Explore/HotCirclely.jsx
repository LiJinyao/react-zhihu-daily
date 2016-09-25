import React, { PropTypes } from 'react';
import style from './HotCirclely.styl';
import { zhihuAPI } from '../../statics';
import { Link } from 'react-router';
const HotCirclely = ({ title, id, meta, image, circleExtra }) => {
  const banner = circleExtra ? circleExtra.image : '';
  const avatar = circleExtra ? circleExtra.thumbnail : image;
  const description = circleExtra ? circleExtra.description : '';
  const name = circleExtra ? circleExtra.creator.name : '';
  return (
    <div className={style.hotCirclelyBody}>
      <div className={style.banner}>
        <Link to={`/explore/${id}`}>
          <img className={style.bannerImg} src={`${zhihuAPI}?url=${banner}`} alt={title} />
        </Link>

      </div>
      <div className={style.ha}>
        <h2 className={style.title}>
          <Link to={`/explore/${id}`} >
            {title}
          </Link>
        </h2>
        <span className={style.desc}>{description}</span>
        <div className={style.meta}>
          <img
            className={style.avatar}
            src={`${zhihuAPI}?url=${avatar}`}
            alt={name}
          />
          {meta}
        </div>
      </div>
    </div>
  );
};

HotCirclely.propTypes = {
  title:       PropTypes.string.isRequired,
  id:          PropTypes.string.isRequired,
  meta:        PropTypes.string.isRequired,
  image:       PropTypes.string,
  circleExtra: PropTypes.object,
};

export default HotCirclely;
