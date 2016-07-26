import React, { PropTypes } from 'react';
import errorStyle from './ErrorStatus.styl';

const ErrorStatus = ({ errorMessage }) => {
  return (
    <span className={errorStyle.errorText}>{`网络错误：${errorMessage}`}</span>
  );
};

ErrorStatus.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorStatus;
