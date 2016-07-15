import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics'
const StoryItem = ({title, images}) => (
  <div>
    {title}
    <img src={zhihuAPI+images}/>
  </div>
);

export default StoryItem;
