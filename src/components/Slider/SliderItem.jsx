import React from 'react';
import style from './SldierItem.styl';
import { SLIDE_ACTIVE, SLIDE_LEFT, SLIDE_RIGHT } from './Slider';
const SliderItem = ({ data, slideState, timeStyle }) => {
  let stateClassName;
  switch (slideState) {
    case SLIDE_ACTIVE:
      stateClassName = style.active;
      break;
    case SLIDE_LEFT:
      stateClassName = style.left;
      break;
    case SLIDE_RIGHT:
      stateClassName = style.right;
      break;
    default:
      stateClassName = '';
  }
  return (
    <li className={`${style.itemwarp} ${stateClassName}`} style={timeStyle}>
      {data}
    </li>);
};

// SliderItem.propTypes = {
//   data: PropTypes.strin
// }

export default SliderItem;
