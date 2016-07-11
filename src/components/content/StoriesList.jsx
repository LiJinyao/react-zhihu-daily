import React, { PropTypes } from 'react';
import style from './StoriesList.styl';
import StoryItem from './StoryItem';

const StoriesList = ({ onStoryClick, stories }) => (
  <div>
    {
      stories.map(story => (
        <StoryItem
          key={story.id}
          {...story}
          onStoryClick={onStoryClick}
        />))
    }
  </div>
);

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
  onStoryClick: PropTypes.func.isRequired
}

export default StoriesList;
