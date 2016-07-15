import React, { PropTypes } from 'react';
import style from './StoriesList.styl';
import StoryItem from './StoryItem';

const StoriesList = ({ onStoryClick, stories }) => (
  <div>
    {
      stories.map(dailyStory => {
        let stories = dailyStory.stories.map( story => (
            <StoryItem
              key={story.id}
              {...story}
              onStoryClick={onStoryClick}
            />
          )
        );

        // push date tag in the front
        stories.unshift(<div>{dailyStory.date}</div>);

        // push next day in the end
        stories.push(<input type="button" value={"Next Day"}/>);
        
        return stories;
      })
    }
  </div>
);

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
  onStoryClick: PropTypes.func.isRequired
}

export default StoriesList;
