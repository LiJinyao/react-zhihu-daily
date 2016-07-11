import React, { PropTypes } from 'react';

const StoryItem = ({title, images}) => (
  <div>
    {title}
    <img src={images} rel="noreferrer"/>
  </div>
);

export default StoryItem;
