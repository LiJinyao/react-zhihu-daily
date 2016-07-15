import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Story extends Component {

  componentDidMount() {

  }
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
  return { dispatch };
}
