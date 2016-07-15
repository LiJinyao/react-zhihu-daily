import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchNews, readStory } from '../actions';
import StoriesList from '../components/content/StoriesList';
class Stories extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch news when mounted
    const { dispatch } = this.props;
    dispatch(fetchNews('latest'));
  }

  render() {
    const { isFetching, stories, onStoryClick } = this.props;
    return (
      <div>
      {
        isFetching && <h1>loading</h1>
      }
      {!isFetching && stories.length > 0 && <StoriesList
        onStoryClick={onStoryClick}
        stories={stories}
        />
      }
      </div>
    );
  }
}

Stories.propsTypes = {
  dispatch: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired,
  onStoryClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log(state.news.items.stories);
  return {
    // get a day's stories.
    stories: state.news.items,
    isFetching: state.news.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStoryClick: (id) => {
      dispatch(readStory(id));
    },
    dispatch
  }
}

// const Stories = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(StoriesList);


export default connect(mapStateToProps, mapDispatchToProps)(Stories);
