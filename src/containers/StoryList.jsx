import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../actions';
import StoriesList from '../components/storylist/StoriesList';

class StoryList extends Component {
  componentDidMount() {
    // fetch news when mounted
    this.props.dispatch(fetchNews('latest'));
  }
  render() {
    const { isFetching, stories, dispatch, fetchError, errorMessage } = this.props;
    return (
      <div>
      {
        <StoriesList
          errorMessage={errorMessage}
          fetchError={fetchError}
          isFetching={isFetching}
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
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => (
  {
    // get a day's stories.
    stories: state.news.items,
    isFetching: state.news.isFetching,
    fetchError: state.news.fetchError,
    errorMessage: state.news.errorMessage,
  }
);

// 没有使用mapDispatchToProps时dispatch对象会自动赋值到props上。
// const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps)(StoryList);
