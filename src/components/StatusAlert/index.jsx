import React, { PropTypes } from 'react';
import Loading from './Loading';
import ErrorStatus from './ErrorStatus';
import style from './Status.styl';
/*
alert type
 */
export const STATUS_ALERT_LOADING = 'STATUS_ALERT_LOADING';
export const STATUS_ALERT_ERROR = 'STATUS_ALERT_ERROR';

export function expandHeight() {
  const headerHeight = document.querySelector('.appheader').clientHeight;
  const footerHeight = document.querySelector('.appfooter').clientHeight;

  let pageWidth = window.innerWidth;
  let pageHeight = window.innerHeight;

  if (typeof pageWidth !== 'number') {
    if (document.compatMode === 'CSS1Copat') {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageWidth = document.body.cilentWidth;
      pageHeight = document.body.cilentHeight;
    }
  }
  return pageHeight - headerHeight - footerHeight;
}

const StatusAlert = ({ status, errorMessage, expand }) => {
  let warpClassName = style.warp;
  if (expand) {
    warpClassName += ' ';
    warpClassName += style.expand;
  }
  const expendStyle = { height: `${expandHeight()}px` };
  let child;
  switch (status) {
    case STATUS_ALERT_LOADING:
      child = (<Loading />);
      break;
    case STATUS_ALERT_ERROR:
      child = (<ErrorStatus errorMessage={errorMessage} />);
      break;
    default:
      child = (<Loading expand={expand} />);
      break;
  }
  return (
    <div className={warpClassName} style={expendStyle}>
      <div className={style.content}>
        {child}
      </div>
    </div>);
};

StatusAlert.propTypes = {
  status: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  expand: PropTypes.bool,
};



export default StatusAlert;
