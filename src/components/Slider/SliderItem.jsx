import React, { PropTypes } from 'react';
import style from './SldierItem.styl';
import { zhihuAPI } from '../../statics';
import { Link } from 'react-router';

const SliderItem = ({ data, itemWidth }) => (
  <li
    className={style.itemwarp}
    style={{
      width:            `${itemWidth}px`,
      backgroundImage:  `url('${zhihuAPI}${data.image}')`,
      backgroundSize:   'cover',
      backgroundRepeat: 'no-repeat',
    }}
  >

    <div className={style.header}>
     {data.title}
    </div>
    <Link className={style.linkwarp} to={`/news/${data.id}`} />
  </li>
);

SliderItem.propTypes = {
  data:      PropTypes.object,
  itemWidth: PropTypes.number,
};

export default SliderItem;
