import React, { PropTypes } from 'react';
import style from './StoriesList.styl';
import Story from './Story';

const StoriesList = ({ onStoryClick, stories }) => (
  <div>
    {
      stories.map(story => (
        <Story
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

/*
stories.map(story =>
  <Story
    key={story.id}
    {...story}
    onClick={() => onStoryClick(story.id)}
  >
  </Story>
)
 */
