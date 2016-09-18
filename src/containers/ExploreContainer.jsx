import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Explore from '../components/Explore';
import { fetchExploreIfNeeded } from '../actions';

class ExploreContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchExploreIfNeeded());
  }
  render() {
    const {
      isFetching, explore, dispatch, fetchError, errorMessage } = this.props;
    return (
      <Explore
        isFetching={isFetching}
        explore={explore}
        dispatch={dispatch}
        fetchError={fetchError}
        errorMessage={errorMessage}
      />
    );
  }
}

ExploreContainer.propTypes = {
  dispatch:      PropTypes.func.isRequired,
  explore:       PropTypes.instanceOf(Map).isRequired,
  isFetching:    PropTypes.bool.isRequired,
  fetchError:    PropTypes.bool.isRequired,
  errorMessage:  PropTypes.string,
};

const mapStateToProps = state => (
  {
    // get a day's explore.
    explore:       state.explore.cache,
    isFetching:    state.explore.isFetching,
    fetchError:    state.explore.fetchError,
    errorMessage:  state.explore.errorMessage,
  }
);

export default connect(mapStateToProps)(ExploreContainer);
