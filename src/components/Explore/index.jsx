import React, { PropTypes } from 'react';
import StatusAlert, { STATUS_ALERT_LOADING, STATUS_ALERT_ERROR } from '../StatusAlert';
import ThemeItem from './ThemeItem';
const Explore = ({ isFetching, fetchError, explore, errorMessage }) => {
  const list = [];
  if (isFetching) {
    return (<StatusAlert status={STATUS_ALERT_LOADING} key="Loading" expand />);
  }

  if (fetchError) {
    return (
      <StatusAlert status={STATUS_ALERT_ERROR} key="error" errorMessage={errorMessage} />
    );
  }
  if (explore !== null) {
    list.push(explore.hotCirclely.map((item, index) => (
      <ThemeItem {...item} key={index} />
   )));
  }
  return (
    <div className="exploreContainer">
      {list}
    </div>
  );
};
Explore.propTypes = {
  dispatch:      PropTypes.func.isRequired,
  explore:        PropTypes.object,
  isFetching:    PropTypes.bool.isRequired,
  fetchError:    PropTypes.bool.isRequired,
  errorMessage:  PropTypes.string,
};
export default Explore;
