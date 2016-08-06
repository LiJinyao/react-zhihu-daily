import React, { PropTypes, Component } from 'react';
import StatusAlert, { STATUS_ALERT_LOADING, STATUS_ALERT_ERROR } from '../StatusAlert';
class Explore extends Component {
  render() {
    return (<StatusAlert status={STATUS_ALERT_LOADING} key="Loading" expand />);
  }
}
export default Explore;
