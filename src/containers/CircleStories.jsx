import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCircleStoriesIfNeeded } from '../actions';
import StoriesList from '../components/Explore/CircleStories';
class CircleStories extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCircleStoriesIfNeeded(this.props.circleID));
  }
  render() {
    const { isFetching, circleStories, dispatch, fetchError, errorMessage, circleID, explore } = this.props;
    return (
      <StoriesList
        isFetching={isFetching}
        circleStories={circleStories.get(circleID)}
        dispatch={dispatch}
        fetchError={fetchError}
        errorMessage={errorMessage}
        explore={explore.get(circleID)}
      />
    );
  }
}

CircleStories.propTypes = {
  explore:       PropTypes.object,
  dispatch:      PropTypes.func.isRequired,
  circleStories: PropTypes.object,
  isFetching:    PropTypes.bool.isRequired,
  fetchError:    PropTypes.bool.isRequired,
  errorMessage:  PropTypes.string,
  circleID:      PropTypes.string,
};

const mapStateToProps = (state, ownProps) => (
  {
    // get a day's explore.
    circleStories: state.circleStories.cache,
    isFetching:    state.circleStories.isFetching,
    fetchError:    state.circleStories.fetchError,
    errorMessage:  state.circleStories.errorMessage,
    circleID:      ownProps.params.id,
    explore:       state.explore.cache,
  }
);

export default connect(mapStateToProps)(CircleStories);
