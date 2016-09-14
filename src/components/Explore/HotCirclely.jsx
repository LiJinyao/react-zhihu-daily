import React, { PropTypes } from 'react';
import style from './HotCirclely.styl';
import { zhihuAPI } from '../../statics';
const HotCirclely =({title, id, extra, meta, image}) => {
  return (
    <div className={style.hotCirclelyBody}>
      <div className={style.banner}>
        <a href={`/explore/${id}`}>
          <img src={`${zhihuAPI}?url=${extra.image}`} alt={title} />
        </a>
      </div>
      <div className={style.ha}>
        <h2 className={style.title}>
          <a href={`/explore/${id}`}>
            {title}
          </a>
        </h2>
        <span className={style.desc}>{extra.description}</span>
        <div className={style.meta}>
        <img className={style.avatar} src={`${zhihuAPI}?url=${image}`} alt={extra.creator.name}/>{meta}
        </div>
      </div>
    </div>
  );
};
export default HotCirclely;
