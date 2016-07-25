import React, { PropTypes } from 'react';
import style from './Slider.styl';

const Slider = ({ onClick, stories }) => (
  <div onClick={onClick}>
    {...stories}
  </div>
);

Slider.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Slider;
