import React, { PropTypes, Component } from 'react';
import StatusAlert, { STATUS_ALERT_LOADING, STATUS_ALERT_ERROR } from '../StatusAlert';
import ThemeItem from './ThemeItem';
import style from './Explore.styl';
class Explore extends Component {
  render() {
    const list = [];
    const { isFetching, fetchError, themes, theme } = this.props;
    if (isFetching) {
      return (<StatusAlert status={STATUS_ALERT_LOADING} key="Loading" expand />);
    }

    if (fetchError) {
      return (<StatusAlert status={STATUS_ALERT_ERROR} key="Loading" />);
    }
    if (themes !== null) {
      list.push(themes.others.map((item, index) => (
        <ThemeItem {...item} theme={theme.get(item.id)} key={index} />
     )));
    }
    return (
      <div className="mainContainer">
        {list}
      </div>
    );
  }
}
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
