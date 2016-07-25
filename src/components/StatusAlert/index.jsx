import React, { PropTypes } from 'react';
import Loading from './Loading';
import ErrorStatus from './ErrorStatus';
/*
alert type
 */
export const STATUS_ALERT_LOADING = 'STATUS_ALERT_LOADING';
export const STATUS_ALERT_ERROR = 'STATUS_ALERT_ERROR';

const StatusAlert = ({ status }) => {
  switch (status) {
    case STATUS_ALERT_LOADING:
      return (<Loading />);
    case STATUS_ALERT_ERROR:
      return (<ErrorStatus />);
    default:
      return (<Loading />);
  }
};

StatusAlert.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusAlert;