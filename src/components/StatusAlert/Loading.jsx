import React, { PropTypes } from 'react';
import loading from './Loading.styl';

const Loading = () => {
  return (
    <div>
      <div className={loading.spinner}>
      </div>
      <span className={loading.text}>
      loading...
      </span>
    </div>
  );
};

Loading.propTypes = {
  expand: PropTypes.bool,
};

export default Loading;
