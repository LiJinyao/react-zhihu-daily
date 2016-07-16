import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchStory } from '../actions/index';
import Story from '../components/story';

class StoryContainer extends Component {
  componentDidMount() {
    const { dispatch, storyID, stories } = this.props;
    if (!stories.has(storyID)) {
      dispatch(fetchStory(storyID));
    }
  }

  render() {
    const { isFetching, storyID, stories } = this.props;
    return (
      <div>
      {isFetching &&
        'Loadding'
      }
      {stories.has(storyID) &&
        <Story story={this.props.stories.get(storyID)} />
      }
      </div>
    );
  }
}

StoryContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stories: PropTypes.instanceOf(Map).isRequired,
  storyID: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => (
  {
    stories: state.stories.storyCache,
    isFetching: state.stories.isFetching,
    storyID: ownProps.params.id,
  }
);

export default connect(mapStateToProps)(StoryContainer);
