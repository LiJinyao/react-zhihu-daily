import React, { PropTypes } from 'react';
import style from './SldierItem.styl';
import { zhihuAPI } from '../../statics';
import { Link } from 'react-router';

const SliderItem = ({ data }) => (
  <div
    className={style.itemwarp}
    style={{
      backgroundImage:    `url('${zhihuAPI}${data.image}')`,
      backgroundSize:     'cover',
      backgroundRepeat:   'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    <div className={style.header}>
     {data.title}
    </div>
    <Link className={style.linkwarp} to={`/news/${data.id}`} />
  </div>
);

SliderItem.propTypes = {
  data:      PropTypes.object,
};

export default SliderItem;
