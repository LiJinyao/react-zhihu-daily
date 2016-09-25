import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCircleStoriesIfNeeded, fetchCircleStoryExtraIfNeeded } from '../actions';
import StoriesList from '../components/Explore/CircleStories';
class CircleStories extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCircleStoriesIfNeeded(this.props.circleID));
    this.props.dispatch(fetchCircleStoryExtraIfNeeded(this.props.circleID));
  }
  render() {
    const {
      isFetching,
      circleStories,
      dispatch,
      fetchError,
      errorMessage,
      circleID,
      circleStoryExtra } = this.props;
    if (circleStoryExtra.size > 0 && !isFetching) {
      return (
        <StoriesList
          isFetching={isFetching}
          circleStories={circleStories.get(circleID)}
          dispatch={dispatch}
          fetchError={fetchError}
          errorMessage={errorMessage}
          circleStoryExtra={circleStoryExtra.get(circleID)}
        />
      );
    }
    return null;
  }
}

CircleStories.propTypes = {
  circleStoryExtra: PropTypes.object,
  dispatch:         PropTypes.func.isRequired,
  circleStories:    PropTypes.object,
  isFetching:       PropTypes.bool.isRequired,
  fetchError:       PropTypes.bool.isRequired,
  errorMessage:     PropTypes.string,
  circleID:         PropTypes.string,
};

const mapStateToProps = (state, ownProps) => (
  {
    // get a day's explore.
    circleStories:    state.circleStories.cache,
    isFetching:       state.circleStories.isFetching,
    fetchError:       state.circleStories.fetchError,
    errorMessage:     state.circleStories.errorMessage,
    circleID:         ownProps.params.id,
    circleStoryExtra: state.circleStoryExtra.cache,
  }
);

export default connect(mapStateToProps)(CircleStories);
