import React, { PropTypes } from 'react';
const CircleStories = ({
  isFetching,
  circleStories,
  dispatch,
  fetchError,
  errorMessage,
  circleStoryExtra }) => {
  return (<h1>{circleStoryExtra.name}</h1>)
};
export default CircleStories;
