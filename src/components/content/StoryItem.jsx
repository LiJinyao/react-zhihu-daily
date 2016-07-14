import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics'
const StoryItem = ({title, images}) => (
  <div>
    {title}
    <img src={zhihuAPI+images} rel="noreferrer"/>
  </div>
);

export default StoryItem;
