import React, { PropTypes } from 'react';
import style from './StoriesList.styl';
import StoryItem from './StoryItem';

const StoriesList = ({ stories }) => (
  <div>
    {
      stories.map(dailyStory => {
        const storyList = dailyStory.stories.map(story => (
          <StoryItem
            key={story.id}
            {...story}
          />
          )
        );
        // push date tag in the front
        storyList.unshift(<div>{dailyStory.date}</div>);

        // push next day in the end
        storyList.push(<input type="button" value={"Next Day"} />);
        return storyList;
      })
    }
  </div>
);

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
};

export default StoriesList;
