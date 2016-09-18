import React, { PropTypes } from 'react';
import style from './HotCirclely.styl';
import { zhihuAPI } from '../../statics';
import { Link } from 'react-router';
const HotCirclely =({title, id, extra, meta, image}) => {
  return (
    <div className={style.hotCirclelyBody}>
      <div className={style.banner}>
        <Link to={`/explore/${id}`}>
          <img src={`${zhihuAPI}?url=${extra.image}`} alt={title} />
        </Link>

      </div>
      <div className={style.ha}>
        <h2 className={style.title}>
          <Link to={`/explore/${id}`} >
            {title}
          </Link>
        </h2>
        <span className={style.desc}>{extra.description}</span>
        <div className={style.meta}>
          <img
            className={style.avatar}
            src={`${zhihuAPI}?url=${image}`}
            alt={extra.creator.name}
          />
          {meta}
        </div>
      </div>
    </div>
  );
};
export default HotCirclely;
