import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchStory } from '../actions/index';
import Story from '../components/story';
import StatusAlert, { STATUS_ALERT_LOADING, STATUS_ALERT_ERROR } from '../components/StatusAlert';
class StoryContainer extends Component {
  componentDidMount() {
    const { dispatch, storyID, stories } = this.props;
    if (!stories.has(storyID)) {
      dispatch(fetchStory(storyID));
    }
  }

  render() {
    const { isFetching, storyID, stories, fetchError, errorMessage } = this.props;
    return (
      <div>
      {fetchError &&
        <StatusAlert status={STATUS_ALERT_ERROR} errorMessage={errorMessage} expand />
      }
      {isFetching &&
        <StatusAlert status={STATUS_ALERT_LOADING} expand />
      }
      {stories.has(storyID) &&
        <Story story={this.props.stories.get(storyID)} />
      }
      </div>
    );
  }
}

StoryContainer.propTypes = {
  dispatch:     PropTypes.func.isRequired,
  stories:      PropTypes.instanceOf(Map).isRequired,
  storyID:      PropTypes.string,
  isFetching:   PropTypes.bool.isRequired,
  fetchError:   PropTypes.bool,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  stories:      state.stories.storyCache,
  isFetching:   state.stories.isFetching,
  storyID:      ownProps.params.id,
  fetchError:   state.stories.fetchError,
  errorMessage: state.stories.errorMessage,
});

export default connect(mapStateToProps)(StoryContainer);
