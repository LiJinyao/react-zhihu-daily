import React, { PropTypes } from 'react';
import style from './SwipeNav.styl';

const SwipeNav = ({ next, prev }) => (
  <div className={style.directionNav}>
    <i
      className={`${style.prev} ${style.navbtn} iconfont`}
      onClick={prev}
    />
    <i
      className={`${style.next} ${style.navbtn} iconfont`}
      onClick={next}
    />
  </div>
);

SwipeNav.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default SwipeNav;
