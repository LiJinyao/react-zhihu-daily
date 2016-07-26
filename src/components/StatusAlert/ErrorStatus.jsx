import React, { PropTypes } from 'react';
import style from './ErrorStatus.styl';

const ErrorStatus = ({ errorMessage }) => (
  <div className={style.errorStatus}>
    <span>{`网络错误：${errorMessage}`}</span>
  </div>
);

ErrorStatus.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorStatus;
