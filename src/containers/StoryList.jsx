import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../actions';
import StoriesList from '../components/content/StoriesList';

class StoryList extends Component {
  componentDidMount() {
    // fetch news when mounted
    this.props.dispatch(fetchNews('latest'));
  }
  render() {
    const { isFetching, stories, dispatch } = this.props;
    return (
      <div>
      {
        isFetching && <h1>loading</h1>
      }
      {
        !isFetching && stories.length > 0 && <StoriesList
          stories={stories}
          fetchNews={(date) => { dispatch(fetchNews(date)); }}
        />
      }
      </div>
    );
  }
}

StoryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    // get a day's stories.
    stories: state.news.items,
    isFetching: state.news.isFetching,
  }
);

// 没有使用mapDispatchToProps时dispatch对象会自动赋值到props上。
// const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps)(StoryList);
