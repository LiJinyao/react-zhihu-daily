import React, { PropTypes } from 'react';
import StatusAlert, { STATUS_ALERT_LOADING, STATUS_ALERT_ERROR } from '../StatusAlert';
import ThemeItem from './ThemeItem';
const Explore = ({ isFetching, fetchError, themes, theme, errorMessage }) => {
  const list = [];
  if (isFetching) {
    return (<StatusAlert status={STATUS_ALERT_LOADING} key="Loading" expand />);
  }

  if (fetchError) {
    return (
      <StatusAlert status={STATUS_ALERT_ERROR} key="error" errorMessage={errorMessage} />
    );
  }
  if (themes !== null) {
    list.push(themes.top.map((item, index) => (
      <ThemeItem {...item} theme={theme.get(item.id)} key={index} />
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
  themes:        PropTypes.object,
  theme:         PropTypes.instanceOf(Map),
  isFetching:    PropTypes.bool.isRequired,
  fetchError:    PropTypes.bool.isRequired,
  errorMessage:  PropTypes.string,
  lastUpdated:   PropTypes.number,
  didInvalidate: PropTypes.bool.isRequired,
};
export default Explore;
