import React, { PropTypes } from 'react';
import { zhihuAPI } from '../../statics'
const StoryItem = ({title, images, id}) => (
  <div>
    {title}
    {id}
    <img src={zhihuAPI+images}/>
  </div>
);

export default StoryItem;
