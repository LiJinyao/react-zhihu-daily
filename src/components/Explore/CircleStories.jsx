import React, { PropTypes } from 'react';
const CircleStories = ({ isFetching, circleStories, dispatch, fetchError, errorMessage, explore }) => {
  console.log(explore.title);
  return (<h1>{explore.title}</h1>)
};
export default CircleStories;
