import React, { PropTypes, Component } from 'react';
import StatusAlert, { STATUS_ALERT_LOADING, STATUS_ALERT_ERROR } from '../StatusAlert';
import ThemeItem from './ThemeItem';
class Explore extends Component {
  render() {
    const list = [];
    const { isFetching, fetchError, themes } = this.props;
    if (isFetching) {
      return (<StatusAlert status={STATUS_ALERT_LOADING} key="Loading" expand />);
    }

    if (fetchError) {
      return (<StatusAlert status={STATUS_ALERT_ERROR} key="Loading" />);
    }
    if (themes !== null) {
      list.push(themes.others.map((item, index) => (
        <ThemeItem {...item} key={index} />
     )));
    }
    return (
      <div>
        {list}
      </div>
    );
  }
}
Explore.propTypes = {
  dispatch:      PropTypes.func.isRequired,
  themes:        PropTypes.object,
  isFetching:    PropTypes.bool.isRequired,
  fetchError:    PropTypes.bool.isRequired,
  errorMessage:  PropTypes.string,
  lastUpdated:   PropTypes.number,
  didInvalidate: PropTypes.bool.isRequired,
};
export default Explore;
